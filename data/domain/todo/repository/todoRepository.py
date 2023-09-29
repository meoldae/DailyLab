from sqlalchemy.orm import Session
from mysql import models
from datetime import datetime, timedelta, date


def getUserTodo(member_id: int, todo_date:date, db: Session):
    todoList = db.query(models.todo).filter(models.todo.member_id == member_id) \
    .filter(models.todo.todo_date == todo_date) \
    .all()

    if not todoList: return 0
    else: return todoList


def getWhitelist(member_id: int, db: Session):
    whitelist = db.query(models.category_white_list).filter(models.category_white_list.member_id == member_id).all()

    if not whitelist:
        return 0
    else : return whitelist

def getBlacklist(member_id: int, db: Session):
    blacklist = (db.query(models.category_black_list).filter(models.category_black_list.member_id == member_id)
                 .filter(models.category_black_list.is_remove == 1).all())

    if not blacklist:
        return 0
    else:
        return blacklist

def getRecommendedList(member_id: int, day: int, db: Session):
    recommendedList = db.query(models.todo_report).filter(models.todo_report.member_id == member_id)\
    .filter(models.todo_report.last_recommend_date >= datetime.now().date()-timedelta(days=day))\
    .all()

    if not recommendedList:
        return 0
    else : return recommendedList

def getAllRemoveCategory(db: Session):
    removeCategory = db.query(models.category_dict).filter(models.category_dict.recommendation_fit == 0).all()

    return removeCategory

def getTodoCount(member_id: int, day: int, db: Session):
    todoCount = db.query(models.todo).filter(models.todo.member_id == member_id)\
    .filter(models.todo.todo_date >= datetime.now().date()-timedelta(days=day))\
    .filter(models.todo.is_deleted == 0).count()

    return todoCount