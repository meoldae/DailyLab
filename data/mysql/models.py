from sqlalchemy import *
from sqlalchemy.orm import declarative_base

Base = declarative_base()

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