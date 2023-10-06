from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from datetime import date

from mysql.database import get_db
from mysql import schemas
from domain.todo.service import todoService

router = APIRouter(
    # 배포 데이터 서버 활용할 경우 아래 필요 없음.
    # prefix="/data",
)


@router.get("/{memberId}")
async def makeTodo(memberId: int, db: Session = Depends(get_db)):
    todoResult = todoService.makeTodo(memberId, date.today() ,db)

    if todoResult is not None:
        return todoResult.to_dict()
    raise HTTPException(status_code=401, detail="no todo")


@router.get("/recommend/{memberId}")
async def makeRecommendTodo(memberId: int, db: Session = Depends(get_db)):
    otherUserList = todoService.specialTodo(memberId, 7, db)

    if otherUserList:
        return otherUserList
    raise HTTPException(status_code=401, detail="no todo")


@router.post("/recommend")
async def makeTodo(request: schemas.specialTodo, db: Session = Depends(get_db)):
    otherUserList = todoService.specialTodo(request.memberId, request.period, db)

    if otherUserList:
        return otherUserList
    raise HTTPException(status_code=401, detail="no todo")


@router.post("/todo")
async def makeTodoByPost(request: schemas.todoReq, db: Session = Depends(get_db)):
    todoResult = todoService.makeTodo(request.memberId, request.todoDate, db)

    if todoResult is not None:
        return todoResult.to_dict()
    raise HTTPException(status_code=401, detail="todo Result에서 에러 뜸!")
