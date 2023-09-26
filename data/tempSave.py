from collections import defaultdict


class DefaultLocation:
    def __init__(self):
        self.latitude = 36.3529755
        self.longitude = 127.3450257


userLocations = defaultdict(DefaultLocation)


class DefaultWeatherDict:
    def __init__(self):
        self.rain = "강수없음"
        self.sky = "흐림"
        self.temperature = "20"
        self.humidity = "60"

    def __str__(self):
        return f"rain='{self.rain}' sky='{self.sky}' temperature={self.temperature} humidity={self.humidity}"

# weatherDict를 defaultdict로 수정하고 DefaultWeatherDict의 인스턴스를 추가합니다.
weatherDict = defaultdict(DefaultWeatherDict)

