from domain.todo.repository import todoRepository
from sqlalchemy import desc

from mysql import models
from domain.todo.contents_based_filtering import cbf


def makeTodo(member_id: int, db):
    firstList = todoRepository.getUserTodo(member_id, db)

    topFiveRecords = todoRepository.getRecomendedList(member_id, db)
    topFiveRecords = topFiveRecords.order_by(desc(models.todo_report.success_count + models.todo_report.fail_count))
    topFiveRecords = topFiveRecords.limit(5).all()


    resultList = [0] * 290
    for record in topFiveRecords:
        category_id = record.category_id
        resultList = resultList + cbf.printSim(str(category_id))

    for remove in firstList:
        category_id = remove.category_id
        resultList = resultList.drop(category_id)

    resultList = resultList.sort_values(ascending=False)

    return resultList

