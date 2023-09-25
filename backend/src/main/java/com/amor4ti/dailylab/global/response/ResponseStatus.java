package com.amor4ti.dailylab.global.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ResponseStatus {
    /* 공통 */
    RESPONSE_SUCCESS("200", "요청에 성공했습니다."),

    /* Emotion */
    REGISTER_EMOTION_SUCCESS("200", "감정이 정상적으로 추가되었습니다."),

    /* Diary */
    CREATE_PREDICT_DIARY("201", "일기작성 요청을 확인했습니다."),
    CREATE_CONFIRM_DIARY("201", "마무리 일기작성 요청을 확인했습니다"),
    /* Member */

    ACCESS_MEMBER_PROCEED("201", "하루 시작 요청이 정상적으로 수행되었습니다."),
    ACCESS_TOKEN_REFRESHED("1001", "액세스 토큰이 재 발급되었습니다"),

    SIGNUP_SUCCESS("2000", "회원 가입이 완료 되었습니다."),
    LOGIN_SUCCESS("2001", "로그인 되었습니다."),
    LOGOUT_SUCCESS("2002", "로그아웃 되었습니다."),

    TODO_REGIST_SUCCESS("3000", "Todo가 등록되었습니다."),

    HOBBY_REGIST_SUCCESS("4000", "관심사가 등록되었습니다."),
    HOBBY_DELETE_SUCCESS("4004", "관심사 삭제가 완료되었습니다.");

    private final String code;
    private final String message;
}
