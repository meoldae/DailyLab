import string
from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from mysql.database import get_db
from mysql import schemas
from domain.todo.service import todoService

router = APIRouter(
    # 배포 데이터 서버 활용할 경우 아래 필요 없음.
    # prefix="/data",
)

@router.get("/{member_id}")
async def makeTodo(member_id: int, db: Session = Depends(get_db)):
    todoResult = todoService.makeTodo(member_id, db)

    if not todoResult.empty :
        return todoResult
    raise HTTPException(status_code=401, detail="no todo")

@router.post("/todo")
async def makeTodoByPost(request: schemas.todoReq, db: Session = Depends(get_db)):
    todoResult =  todoService.makeTodo(request.memberId, db)

    # todoResult가 none이 아니고, todoResult가 비어있지 않고, todoResult 내부 값 중 null 값이 하나도 없을 때
    if todoResult is not None and not todoResult.empty and not todoResult.isnull().all():
        return todoResult
    raise HTTPException(status_code=401, detail="todo Result에서 에러 뜸!")