from sqlalchemy import *
from .database import Base


class Member(Base):
    __tablename__ = 'member'

    member_id = Column(BigInteger, primary_key=True, autoincrement=True)
    email = Column(String)
    username = Column(String)
    gender = Column(String)
    birthday = Column(Date)
    join_date = Column(DateTime)
    exit_date = Column(DateTime)
    provider = Column(String)
    mbti_id = Column(SmallInteger)
    job = Column(String)
    goal = Column(String)
    religion = Column(String)

class todo(Base):
    __tablename__ = "todo"

    todo_id = Column(BigInteger, primary_key=True, autoincrement=True)
    member_id = Column(BigInteger, ForeignKey('Member.member_id'))
    category_id = Column(BigInteger)
    content = Column(String)
    todo_date = Column(Date)
    checked_date = Column(DateTime)
    is_system = Column(Boolean)
    is_deleted = Column(Boolean)

class todo_report(Base):
    __tablename__ = "todo_report"

    todo_report_id = Column(BigInteger, primary_key=True, autoincrement=True)
    member_id = Column(BigInteger, ForeignKey('Member.member_id'))
    category_id = Column(BigInteger)
    success_count = Column(Integer)
    fail_count = Column(Integer)
    first_recommend_date = Column(Date)
    last_recommend_date = Column(Date)

class category_dict(Base):
    __tablename__ = "category"

    category_id = Column(BigInteger, primary_key=True, autoincrement=True)
    large = Column(String)
    medium = Column(String)
    small = Column(String)
    recommendation_fit = Column(Integer)

class category_black_list(Base):
    __tablename__ = "category_black_list"

    category_id = Column(BigInteger, ForeignKey('category_dict.category_id'), primary_key=True)
    member_id = Column(BigInteger, ForeignKey('Member.member_id'), primary_key=True)
    is_remove = Column(Boolean)

class category_white_list(Base):
    __tablename__ = "category_white_list"

    category_id = Column(BigInteger, ForeignKey('category_dict.category_id'), primary_key=True)
    member_id = Column(BigInteger, ForeignKey('Member.member_id'), primary_key=True)
