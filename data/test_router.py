from fastapi import FastAPI, Depends, HTTPException, APIRouter
from sqlalchemy.orm import Session

from mysql.models import Member
from mysql.database import SessionLocal, get_db

router = APIRouter(prefix="/data")


@router.get("/member")
async def getMember(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    members = db.query(Member).offset(skip).limit(limit).all()
    return members