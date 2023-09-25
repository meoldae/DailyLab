from collections import defaultdict

class DefaultLocation:
    def __init__(self):
        self.latitude = 36.3529755
        self.longitude = 127.3450257
        print("default!")

userLocations = defaultdict(DefaultLocation)


class DefaultWeatherDict:
    def __init__(self):
        self.rain = "강수없음"
        self.sky = "흐림"
        self.temperature = "20"
        self.humadity = "60"
        print("default!!")

weatherDict = defaultdict(DefaultWeatherDict)