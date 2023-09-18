package com.amor4ti.dailylab.global.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ResponseStatus {
    /* 예시 */
    RESPONSE_SAMPLE("200", "요청에 성공했습니다."),

    ACCESS_TOKEN_REFRESHED("1001", "액세스 토큰이 재 발급되었습니다"),

    SIGNUP_SUCCESS("2000", "회원 가입이 완료 되었습니다.");




    private final String code;
    private final String message;
}
