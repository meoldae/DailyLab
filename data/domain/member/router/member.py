from fastapi import APIRouter
from typing import List

from mysql import schemas
from domain.member.service import memberService

router = APIRouter(
    # 배포 데이터 서버 활용할 경우 아래 필요 없음.
    # prefix="/data",
)

@router.get("/member/make")
async def makeSimiliarity():
    allMember = [
        {
            "memberId": 2,
            "ageGroup": 2,
            "gender": 0,
            "mbtiA": 0,
            "mbtiB": 0,
            "mbtiC": 0,
            "mbtiD": 0,
            "job": 0,
            "religion": 0,
            "hobbyList": []
        },
        {
            "memberId": 3,
            "ageGroup": 2,
            "gender": 0,
            "mbtiA": 0,
            "mbtiB": 0,
            "mbtiC": 0,
            "mbtiD": 0,
            "job": 0,
            "religion": 0,
            "hobbyList": []
        },
        {
            "memberId": 4,
            "ageGroup": 2,
            "gender": 0,
            "mbtiA": 1,
            "mbtiB": 1,
            "mbtiC": 2,
            "mbtiD": 2,
            "job": 0,
            "religion": 0,
            "hobbyList": [
                1,
                7,
                8,
                2,
                4,
                5,
                6
            ]
        },
        {
            "memberId": 9,
            "ageGroup": 2,
            "gender": 0,
            "mbtiA": 0,
            "mbtiB": 0,
            "mbtiC": 0,
            "mbtiD": 0,
            "job": 0,
            "religion": 0,
            "hobbyList": []
        },
        {
            "memberId": 10,
            "ageGroup": 2,
            "gender": 1,
            "mbtiA": 0,
            "mbtiB": 0,
            "mbtiC": 0,
            "mbtiD": 0,
            "job": 1,
            "religion": 0,
            "hobbyList": []
        },
        {
            "memberId": 12,
            "ageGroup": 2,
            "gender": 0,
            "mbtiA": 0,
            "mbtiB": 0,
            "mbtiC": 0,
            "mbtiD": 0,
            "job": 0,
            "religion": 0,
            "hobbyList": []
        },
        {
            "memberId": 14,
            "ageGroup": 2,
            "gender": 0,
            "mbtiA": 1,
            "mbtiB": 1,
            "mbtiC": 1,
            "mbtiD": 2,
            "job": 0,
            "religion": 0,
            "hobbyList": [
                6,
                13,
                17
            ]
        },
        {
            "memberId": 15,
            "ageGroup": 0,
            "gender": 0,
            "mbtiA": 0,
            "mbtiB": 0,
            "mbtiC": 0,
            "mbtiD": 0,
            "job": 0,
            "religion": 0,
            "hobbyList": []
        },
        {
            "memberId": 16,
            "ageGroup": 0,
            "gender": 1,
            "mbtiA": 0,
            "mbtiB": 0,
            "mbtiC": 0,
            "mbtiD": 0,
            "job": 0,
            "religion": 0,
            "hobbyList": []
        },
        {
            "memberId": 17,
            "ageGroup": 0,
            "gender": 0,
            "mbtiA": 2,
            "mbtiB": 1,
            "mbtiC": 1,
            "mbtiD": 1,
            "job": 0,
            "religion": 0,
            "hobbyList": []
        }
    ]
    similarity = memberService.makeMatrix(allMember).values.tolist()
    if similarity:
        return similarity

@router.post("/member/make")
async def makeSimiliarity(request: List[schemas.member]):
    similarity = memberService.makeMatrix(request).values.tolist()

    if similarity:
        return "성공했어용"