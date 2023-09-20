from domain.todo.repository import todoRepository
from sqlalchemy import desc, func

from mysql import models
from domain.todo.contents_based_filtering import cbf


def makeTodo(member_id: int, db):
    # todo 수행일 기준 미리 저장되어있는 todo 가져옴
    firstList = todoRepository.getUserTodo(member_id, db)

    # 최근 7일치 중 가장 많이 등록된 category를 5개만 가져옴
    topFiveRecords = todoRepository.getRecommendedList(member_id, db)
    # topFiveRecords 리스트를 fail_count와 success_count의 합을 기준으로 내림차순 정렬
    topFiveRecords = sorted(topFiveRecords, key=lambda x: x.fail_count + x.success_count, reverse=True)
    # 상위 5개 레코드 선택
    topFiveRecords = topFiveRecords[:5]

    # 선언
    resultList = [0] * 290
    if topFiveRecords:
        for record in topFiveRecords:
            category_id = record.category_id
            resultList = resultList + cbf.printSim(str(category_id))
    else:
        topFiveRecords = [4, 18, 22, 90, 220]
        for record in topFiveRecords:
            resultList = resultList + cbf.printSim(str(record))

    if firstList :
        for remove in firstList:
            category_id = remove.category_id
            resultList = resultList.drop(category_id)

    resultList = resultList.sort_values(ascending=False)

    print(resultList)

    return resultList

