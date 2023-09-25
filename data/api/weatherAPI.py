import math
import time

from fastapi import FastAPI, HTTPException, APIRouter
from datetime import datetime, date, timedelta
import httpx
from pydantic import BaseModel

import config

from tempSave import userLocations, weatherDict, DefaultWeatherDict

app = FastAPI()

# 기초 자료
RE = 6371.00877  # 지구 반경(km)
GRID = 5.0  # 격자 간격(km)
SLAT1 = 30.0  # 투영 위도1(degree)
SLAT2 = 60.0  # 투영 위도2(degree)
OLON = 126.0  # 기준점 경도(degree)
OLAT = 38.0  # 기준점 위도(degree)
XO = 43  # 기준점 X좌표(GRID)
YO = 136  # 기1준점 Y좌표(GRID)

router = APIRouter()


class Weather(BaseModel):
    rain: str
    sky: str
    temperature: int
    humidity: int


@router.get("/weather/{member_id}")
async def get_weather(member_id: int):
    print(userLocations)

    latitude = userLocations[member_id].latitude
    longitude = userLocations[member_id].longitude

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
    nx, ny = xy_converter("toXY", latitude, longitude)

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

        print(f"Weather Execution Time: {execution_time} seconds")

        weatherDict[member_id] = DefaultWeatherDict()
        weatherDict[member_id].rain = weather_dict['rain']
        weatherDict[member_id].sky = weather_dict['sky']
        weatherDict[member_id].temperature = weather_dict['temperature']
        weatherDict[member_id].humidity = weather_dict['humidity']

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


# 경도 -> x, 위도 -> y 로직
def xy_converter(code, v1, v2):
    DEGRAD = math.pi / 180.0
    RADDEG = 180.0 / math.pi

    re = RE / GRID

    slat1 = SLAT1 * DEGRAD
    slat2 = SLAT2 * DEGRAD

    olon = OLON * DEGRAD
    olat = OLAT * DEGRAD

    sn = math.tan(math.pi * 0.25 + slat2 * 0.5) / math.tan(math.pi * 0.25 + slat1 * 0.5)
    sn = math.log(math.cos(slat1) / math.cos(slat2)) / math.log(sn)

    sf = math.tan(math.pi * 0.25 + slat1 * 0.5)
    sf = pow(sf, sn) * math.cos(slat1) / sn

    ro = math.tan(math.pi * 0.25 + olat * 0.5)
    ro = re * sf / pow(ro, sn)

    if code == "toXY":
        ra = math.tan(math.pi * 0.25 + v1 * DEGRAD * 0.5)
        ra = re * sf / pow(ra, sn)

        theta = v2 * DEGRAD - olon

        if theta > math.pi: theta -= 2.0 * math.pi
        if theta < -math.pi: theta += 2.0 * math.pi

        theta *= sn

        x = int(ra * math.sin(theta) + XO + 0.5)
        y = int(ro - ra * math.cos(theta) + YO + 0.5)

        return x, y
    else:
        xn = v1 - XO
        yn = ro - v2 + YO

        ra = math.sqrt(xn * xn + yn * yn)

        if sn < 0.0: ra = -ra

        alat = pow((re * sf / ra), (1.0 / sn))
        alat = 2.0 * math.atan(alat) - math.pi * 0.5

        if abs(xn) <= 0.0:
            theta = 0.0
        else:
            if abs(yn) <= 0.0:
                theta = math.pi * 0.5
                if xn < 0.0: theta = -theta
            else:
                theta = math.atan2(xn, yn)

        alon = theta / sn + olon
        lat = alat * RADDEG
        lon = alon * RADDEG

        return lat, lon
