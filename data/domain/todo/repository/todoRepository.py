from sqlalchemy.orm import Session
from mysql import models, schemas
from datetime import datetime, timedelta

def getUserTodo(member_id: int, db: Session):
    todoList = db.query(models.todo).filter(models.todo.member_id == member_id) \
    .filter(models.todo.todo_date == datetime.now().date() + timedelta(days=1)) \
    .all()

    if not todoList:
         return 0
    else : return todoList

def getWhitelist(member_id: int, db: Session):
    whitelist = db.query(models.category_whitelist).filter(models.category_whitelist.member_id == member_id).all()

    if not whitelist:
        return 0
    else : return whitelist

def getBlacklist(member_id: int, db: Session):
    blacklist = db.query(models.category_blacklist).filter(models.category_blacklist.member_id == member_id).all()

    if not blacklist:
        return 0
    else:
        return blacklist

def getRecommendedList(member_id: int, db: Session):
    recommendedList = db.query(models.todo_report).filter(models.todo_report.member_id == member_id)\
    .filter(models.todo_report.last_recommend_date >= datetime.now().date()-timedelta(days=7))\
    .all()

    if not recommendedList:
        return 0
    else : return recommendedList