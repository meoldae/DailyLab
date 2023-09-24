import time

from fastapi import FastAPI, HTTPException
from datetime import datetime, date, timedelta
import httpx
import config

app = FastAPI()

@app.get("/getUltraSrtFcst")
async def get_ultra_srt_fcst(latitude: float, longitude: float):
    # 함수 시작 시간 기록
    start_time = time.time()

    # 서비스 키
    service_key = config.WEATHER_API_KEY
    url = config.WEATHER_API_URL

    # 현재 날짜와 시간
    now = datetime.now()
    today = datetime.today().strftime("%Y%m%d")
    y = date.today() - timedelta(days=1)
    yesterday = y.strftime("%Y%m%d")

    # 위도와 경도
    # nx = latitude
    # ny = longitude
    nx = 60
    ny = 127

    # base_time과 base_date 구하기
    if now.minute < 45:
        if now.hour == 0:
            base_time = "2330"
            base_date = yesterday
        else:
            pre_hour = now.hour - 1
            if pre_hour < 10:
                base_time = "0" + str(pre_hour) + "30"
            else:
                base_time = str(pre_hour) + "30"
            base_date = today
    else:
        if now.hour < 10:
            base_time = "0" + str(now.hour) + "30"
        else:
            base_time = str(now.hour) + "30"
        base_date = today

    # API 호출 및 데이터 반환
    params = {
        "serviceKey": service_key,
        "base_date": base_date,
        "base_time": base_time,
        "nx": nx,
        "ny": ny,
        "dataType": "json",
        "numOfRows": "60"
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(url, params=params)

    if response.status_code == 200:
        weather_data = response.json()
        # 필요한 데이터를 추출하여 반환

        weather_dict = dict()

        for item in weather_data['response']['body']['items']['item']:
            category = item['category']
            fcst_value = item['fcstValue']

            # 기온
            if category == 'T1H':
                weather_dict['temperature'] = fcst_value
            # 습도
            elif category == 'REH':
                weather_dict['humidity'] = fcst_value
            # 하늘상태: 맑음(1) 구름많은(3) 흐림(4)
            elif category == 'SKY':
                weather_dict['sky'] = map_sky_condition(fcst_value)
            # 강수
            elif category == 'RN1':
                weather_dict['rain'] = fcst_value

        # 함수 실행 시간 계산
        end_time = time.time()
        execution_time = end_time - start_time

        print(f"Execution Time: {execution_time} seconds")

        return weather_dict
    else:
        raise HTTPException(status_code=500, detail="Failed to fetch weather data")


def map_sky_condition(fcst_value):
    if fcst_value == '1':
        return "맑음"
    elif fcst_value == '3':
        return "구름많음"
    elif fcst_value == '4':
        return "흐림"
    else:
        return "알 수 없음"