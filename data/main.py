from fastapi import FastAPI
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware

from api import weatherAPI
from api.weatherAPI import get_weather
from domain.diary import diaryService
from tempSave import userLocations

from domain.member.router import member
from domain.todo.routers import todo

app = FastAPI()

origins = [
    "*"
]

# CORS 미들웨어 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 통신하는 주소에 따라 조정
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# gpt 3.5 일기 작성
@app.post("/diary/default")
async def createDiary(param: dict):
    data = diaryService.createDiary(param, "gpt-3.5-turbo-16k")
    # data = diaryService.createDiary(param, "gpt-4")
    return data


# gpt 4 일기 작성
@app.post("/diary/confirm")
async def createDiary(param: dict):
    data = diaryService.createDiary(param, "gpt-4")
    return data


class Location(BaseModel):
    latitude: float
    longitude: float

@app.post("/location/{member_id}")
async def setLocation(member_id: int, location: Location):
    userLocations[member_id] = location

    await get_weather(member_id)

    return {"status": "Location set successfully"}

# @app.post("/info/{member_id}")
# async def getMemberInfo(member_id: int, memberInfo: MemberInfo):
#     return {"status" : ""}

app.include_router(todo.router)
app.include_router(member.router)
app.include_router(weatherAPI.router)

if __name__ == "__main__":
    import uvicorn

    # from [module_name] import app # FastAPI 객체 가져오기

    # 8181 포트번호에서 FastAPI 어플리케이션 수신 대기
    uvicorn.run(app, host="0.0.0.0", port=8181)
