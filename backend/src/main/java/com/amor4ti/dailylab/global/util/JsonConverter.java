package com.amor4ti.dailylab.global.util;

/*
* json처럼 생긴 String을 실제 json으로 변환하기 위한 컨버터
* */

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.stereotype.Component;

@Component
public class JsonConverter {

    public JsonObject converter(String str) {

        return JsonParser.parseString(str).getAsJsonObject();
    }
}
