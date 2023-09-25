import asyncio

import pandas as pd

from api.weatherAPI import get_weather
from domain.todo.repository import todoRepository
from domain.todo.contents_based_filtering import cbf

from tempSave import userLocations, weatherDict

def makeTodo(member_id: int, db):
    # todo 수행일 기준 미리 저장되어있는 todo 가져옴
    firstList = todoRepository.getUserTodo(member_id, db)
    # 최근 7일치 중 가장 많이 등록된 category를 5개만 가져옴
    topFiveRecords = todoRepository.getRecommendedList(member_id, db)
    if topFiveRecords:
        # topFiveRecords 리스트를 fail_count와 success_count의 합을 기준으로 내림차순 정렬
        topFiveRecords = sorted(topFiveRecords, key=lambda x: x.fail_count + x.success_count, reverse=True)
        # 상위 5개 레코드 선택
        topFiveRecords = topFiveRecords[:5]

    # 선언
    resultList = [0] * 290
    if topFiveRecords:
        for record in topFiveRecords:
            category_id = record.category_id
            resultList = resultList + cbf.printSim(str(category_id - 1))
    else:
        topFiveRecords = [4, 18, 22, 90, 290]
        for record in topFiveRecords:
            resultList = resultList + cbf.printSim(str(record - 1))

    if firstList:
        for remove in firstList:
            category_id = remove.category_id
            resultList = resultList.drop(category_id - 1)

    resultList = afterListProcess(member_id, resultList, db)
    resultList = resultList.sort_values(ascending=False)

    return resultList


def afterListProcess(member_id: int, resultList: list[int], db):
    userBlackList = todoRepository.getBlacklist(member_id, db)
    userWhiteList = todoRepository.getWhitelist(member_id, db)

    allRemoveCategory = todoRepository.getAllRemoveCategory(db)

    if userWhiteList:
        print(len(userWhiteList))
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

    print(resultList)

    return resultList
