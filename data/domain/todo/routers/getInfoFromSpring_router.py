from datetime import datetime, date

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/data")


class Data(BaseModel):
    memberId: int
    todoDate: date



@router.post("/info")
async def getInfo(data: Data):

    memberId = data.memberId
    todoDate = data.todoDate

    print(memberId)
    print(todoDate)


    # 추천

    return
