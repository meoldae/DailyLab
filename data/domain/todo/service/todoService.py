import json
import random
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
    print("topFiveRecords")
    print(topFiveRecords)

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

    # record가 없는 경우 : MBTI로 추천
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

    resultList = process_first_list(firstList, resultList)
    resultList = afterListProcess(member_id, resultList, db)

    # resultList에서 가장 높은 값을 찾아 40%를 증가값으로 설정
    increase_value = resultList.max() * 0.4
    print(resultList)
    print(resultList.max())


    if member_response.mbtiA == 1:
        for idx in mbtiIList.index:
            if idx in resultList.index:
                resultList.loc[idx] += increase_value
    elif member_response.mbtiA == 2:
        for idx in mbtiEList.index:
            if idx in resultList.index:
                resultList.loc[idx] += increase_value

    resultList = resultList.sort_values(ascending=False)

    print(resultList)

    return resultList


def specialTodo(member_id: int, day: int, db):
    similar = filtering.findBest(member_id)
    # similar = similar[:len(similar)/10]
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
            result_list = result_list.drop(category_id - 1)
    return result_list


def afterListProcess(member_id: int, resultList: list[int], db):
    userBlackList = todoRepository.getBlacklist(member_id, db)
    userWhiteList = todoRepository.getWhitelist(member_id, db)

    allRemoveCategory = todoRepository.getAllRemoveCategory(db)

    if userWhiteList:
        for white in userWhiteList:
            category_id = white.category_id
            for all in allRemoveCategory:
                if (all.category_id == category_id):
                    allRemoveCategory.remove(all)
                    break

    if userBlackList:
        for black in userBlackList:
            category_id = black.category_id
            if category_id - 1 in resultList.index:
                resultList = resultList.drop(category_id - 1)

    if allRemoveCategory:
        for remove in allRemoveCategory:
            category_id = remove.category_id
            if category_id - 1 in resultList.index:
                resultList = resultList.drop(category_id - 1)

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
