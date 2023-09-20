from domain.todo.repository import todoRepository
from sqlalchemy import desc

from mysql import models
from domain.todo.contents_based_filtering import cbf


def makeTodo(member_id: int, db):
    # todo 수행일 기준 미리 저장되어있는 todo 가져옴
    firstList = todoRepository.getUserTodo(member_id, db)

    # 최근 7일치 중 가장 많이 등록된 category를 5개만 가져옴
    topFiveRecords = todoRepository.getRecomendedList(member_id, db)
    topFiveRecords = topFiveRecords.order_by(desc(models.todo_report.success_count + models.todo_report.fail_count))
    topFiveRecords = topFiveRecords.limit(5).all()

    # 선언
    resultList = [0] * 290
    for record in topFiveRecords:
        category_id = record.category_id
        resultList = resultList + cbf.printSim(str(category_id))

    for remove in firstList:
        category_id = remove.category_id
        resultList = resultList.drop(category_id)

    resultList = resultList.sort_values(ascending=False)

    print(resultList)

    return resultList

