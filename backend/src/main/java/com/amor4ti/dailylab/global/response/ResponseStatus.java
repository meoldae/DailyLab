package com.amor4ti.dailylab.global.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ResponseStatus {
    /* 공통 */
    REQUEST_SUCCESS("200", "요청에 성공했습니다."),


    /* Member */
    ACCESS_TOKEN_REFRESHED("1001", "액세스 토큰이 재 발급되었습니다"),

    SIGNUP_SUCCESS("2000", "회원 가입이 완료 되었습니다."),
    LOGIN_SUCCESS("2001", "로그인 되었습니다."),
    LOGOUT_SUCCESS("2002", "로그아웃 되었습니다.");

    private final String code;
    private final String message;
}
