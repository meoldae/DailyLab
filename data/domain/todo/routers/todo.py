import string
from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette.responses import JSONResponse
import requests

from mysql.database import get_db
import mysql.models
from mysql import schemas
from domain.todo.service import todoService

router = APIRouter(
    prefix="/data/todo",
)

@router.get("/{member_id}")
async def makeTodo(member_id: int, db: Session = Depends(get_db)):
    todoResult = makeTodo(member_id, db)

    if todoResult :
        return todoResult
    raise HTTPException(status_code=401, detail="no todo")

