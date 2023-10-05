from datetime import date
from typing import Optional

from pydantic import BaseModel


class todoReq(BaseModel):
    memberId: int
    todoDate: date


class member(BaseModel):
    memberId: int
    ageGroup: int
    gender: int
    mbtiA: int
    mbtiB: int
    mbtiC: int
    mbtiD: int
    job: int
    religion: int
    hobbyList: list


class specialTodo(BaseModel):
    memberId: int
    period: int
