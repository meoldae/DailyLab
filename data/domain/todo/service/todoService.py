import time
from datetime import date
from typing import Optional

import numpy as np
import pandas as pd
from pydantic import BaseModel

from domain.todo.repository import todoRepository
from domain.todo.contents_based_filtering import cbf
from mysql.models import Member, mbti

from tempSave import userLocations, weatherDict
from domain.member.filtering import filtering

np.random.seed(int(time.time()))
# 모든 행을 출력하도록 설정
# pd.set_option('display.max_rows', None)

class MemberResponse(BaseModel):
    memberId: int
    birthday: date
    gender: str
    mbtiId: int
    mbtiA: int
    mbtiB: int
    mbtiC: int
    mbtiD: int
    job: Optional[str]
    religion: Optional[str]


def makeTodo(member_id: int, todo_date: date, db):
    # 선언
    resultList = pd.Series([0] * 290)

    member = db.query(Member).filter(Member.member_id == member_id).first()  # 이 부분은 SQLAlchemy 쿼리로 member 객체를 가져옵니다.
    if not member:
        print("해당 member가 존재하지 않아요.")
        return None

    mbti_info = db.query(mbti).filter(mbti.mbti_id == member.mbti_id).first()
    if not mbti:
        print("해당 유저의 mbti id가 세팅되지 않았습니다.")
        return None

    member_response = MemberResponse(
        memberId=member.member_id,
        birthday=member.birthday,
        gender=member.gender,
        mbtiId=member.mbti_id,
        mbtiA=mbti_info.typea,
        mbtiB=mbti_info.typeb,
        mbtiC=mbti_info.typec,
        mbtiD=mbti_info.typed,
        job=member.job,
        religion=member.religion,
    )

    ds = pd.read_csv('dataset/ToDoVer1.csv', encoding='utf-8')

    condition = ds.iloc[:, 4].isin([3, 4, 5])
    filtered_indices = (ds.index[condition]).tolist()
    mbtiEList = [0] * 290
    mbtiEList = resultList[resultList.index.isin(filtered_indices)]

    condition = ds.iloc[:, 4].isin([1, 2, 3])
    filtered_indices = (ds.index[condition]).tolist()
    mbtiIList = [0] * 290
    mbtiIList = resultList[resultList.index.isin(filtered_indices)]

    # todo 수행일 기준 미리 저장되어있는 todo 가져옴
    firstList = todoRepository.getUserTodo(member_id, todo_date, db)

    # 최근 7일치 중 가장 많이 등록된 category를 5개만 가져옴
    topFiveRecords = todoRepository.getRecommendedList(member_id, 7, db)

    if topFiveRecords:
        # topFiveRecords 리스트를 fail_count와 success_count의 합을 기준으로 내림차순 정렬
        topFiveRecords = sorted(topFiveRecords, key=lambda x: x.fail_count + x.success_count, reverse=True)
        # 상위 5개 레코드 선택
        topFiveRecords = topFiveRecords[:5]

    # record 있는 경우
    if topFiveRecords:
        for record in topFiveRecords:
            category_id = record.category_id
            resultList = resultList + cbf.printSim(str(category_id - 1))

    # record가 없는 경우 : MBTI로 추천 (이 경우는 협업 필터링도 불가능 하다.)
    else:
        if member_response.mbtiA == 1:
            return noReportRecommendTodoByMbti(resultList, mbtiIList, firstList, member_id, db)

        elif member_response.mbtiA == 2:
            return noReportRecommendTodoByMbti(resultList, mbtiEList, firstList, member_id, db)

        # 초기 데이터도 없고 MBTI도 없는 경우... : black, white만 거른 후 랜덤
        else:
            resultList = process_first_list(firstList, resultList)
            resultList = afterListProcess(member_id, resultList, db)

            shuffled_resultList = resultList.sample(frac=1)

            return shuffled_resultList.to_dict()

    # 여기까지 넘어온 경우 : todoReport 일주일치에 데이터가 있던 경우!


    # 전처리
    resultList = process_first_list(firstList, resultList)
    resultList = afterListProcess(member_id, resultList, todo_date, db)

    # 컨텐츠 기반 필터링 : 60%, 협업 필터링 : 20%, 성향(MBTI) : 20%

    # 5점 만점을 1.2점 만점으로 만들기
    resultList = resultList / 5 * 0.6

    # 협업 필터링 결과물에서 Top 10만 분리하기
    userResultList = specialTodo(member_id, 7, db)
    if userResultList != 0:
        topTenKeys = list(userResultList.keys())[:10]

        # 점수 부여하기 (1등 : 1*0.2, 2등 : 0.9*0.2, 3등 : 0.8*0.2 ...)
        multiplier = 0.2
        for i, key in enumerate(topTenKeys):
            if key in resultList.index:
                resultList.loc[key] += (1 - i * 0.1) * multiplier

    # 성향 적용
    if member_response.mbtiA == 1:
        for idx in mbtiIList.index:
            if idx in resultList.index:
                resultList.loc[idx] += 0.2
    elif member_response.mbtiA == 2:
        for idx in mbtiEList.index:
            if idx in resultList.index:
                resultList.loc[idx] += 0.2

    # 정렬
    resultList = resultList.sort_values(ascending=False)
    return resultList


def specialTodo(member_id: int, day: int, db):
    similar = filtering.findBest(member_id)
    # similar = similar[:len(similar)/10]
    if similar == 0:
        return 0

    similar = similar[:6]

    category = {}
    for similarMember in similar:
        if similarMember == member_id:
            continue
        otherUserTodo = todoRepository.getRecommendedList(similarMember, day, db)
        if otherUserTodo:
            for todo in otherUserTodo:
                count = todoRepository.getTodoCount(similarMember, day, db)
                if todo.category_id in category:
                    category[todo.category_id] += count
                else:
                    category[todo.category_id] = count
    if category:
        category = dict(sorted(category.items(), key=lambda item: item[1], reverse=True))

    return category


def process_first_list(first_list, result_list):
    if first_list:
        for remove in first_list:
            category_id = remove.category_id
            if category_id - 1 in result_list.index:
                result_list = result_list.drop(category_id - 1)
    return result_list


def afterListProcess(member_id, resultList, todo_date, db):
    userBlackList = todoRepository.getBlacklist(member_id, db)
    userWhiteList = todoRepository.getWhitelist(member_id, db)

    allRemoveCategory = todoRepository.getAllRemoveCategory(db)

    # 화이트리스트에 있는 내용을 초기 추천 안 되는 카테고리에서 지움
    if userWhiteList:
        for white in userWhiteList:
            category_id = white.category_id
            for all in allRemoveCategory:
                if (all.category_id == category_id):
                    allRemoveCategory.remove(all)
                    break

    # 블랙리스트를 추천 리스트에서 지움
    if userBlackList:
        for black in userBlackList:
            category_id = black.category_id
            if category_id - 1 in resultList.index:
                resultList = resultList.drop(category_id - 1)

    # 화이트리스트 적용한 추천 안 되는 카테고리를 추천 리스트에서 지움
    if allRemoveCategory:
        for remove in allRemoveCategory:
            category_id = remove.category_id
            if category_id - 1 in resultList.index:
                resultList = resultList.drop(category_id - 1)

    # 날씨 기반으로 카테고리 제거함
    if weatherDict[member_id].rain != "강수없음":
        print("날씨가 안좋아요.")

        # csv 파일 읽기 - main 기준 파일 path
        ds = pd.read_csv('dataset/ToDoVer1.csv', encoding='utf-8')

        # 11열의 값이 1인 행의 인덱스를 뽑기 (날씨)
        condition = ds.iloc[:, 11] == 1
        # 카테고리 ID - 1
        filtered_indices = (ds.index[condition]).tolist()

        # resultList의 인덱스와 카테고리 ID - 1가 같을 때 drop
        resultList = resultList[~resultList.index.isin(filtered_indices)]

    # 남은 카테고리 중 최근에 진행했던 투두 중 일정 기간이 지나지 않은 걸 제거함
    for idx in resultList.index:
        successDay = todoRepository.getTodoLastDay(member_id, idx + 1, db)
        if successDay:
            if (todo_date - successDay[0]).days < cbf.getPeriod(idx):
                resultList = resultList.drop(idx)

    return resultList  # 또는 필요에 따라 member_response 객체를 반환할 수도 있습니다.


def noReportRecommendTodoByMbti(resultList, mbtiList, firstList, member_id, db):
    resultList = process_first_list(firstList, resultList)
    resultList = afterListProcess(member_id, resultList, db)

    # mbtiList와 resultList에서 공통 인덱스를 가진 항목들만 추출
    common_indices = mbtiList.index.intersection(resultList.index)
    common_items = resultList.loc[common_indices]

    # 추출한 항목들의 인덱스를 랜덤으로 재정렬
    shuffled_indices = np.random.permutation(common_indices)
    shuffled_series = pd.Series(common_items.values, index=shuffled_indices)

    # resultList에서 공통 인덱스 항목들을 랜덤으로 재정렬한 항목들로 교체
    resultList = pd.concat([resultList[~resultList.index.isin(common_indices)], shuffled_series])  # sort_index() 제거

    shuffled_resultList = resultList.iloc[np.random.permutation(len(resultList))]
    return shuffled_resultList.to_dict()
