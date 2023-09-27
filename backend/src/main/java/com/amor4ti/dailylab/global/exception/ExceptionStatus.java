package com.amor4ti.dailylab.global.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ExceptionStatus {

	/* 예시 */
	EXCEPTION("-9999", "예외가 발생하였습니다."),

	/* Diary */
	TODAY_DIARY_IS_EXIST("-400", "이미 오늘 일기를 작성했습니다."),
	DIARY_CANNOT_WRITE("-400", "일기 작성아 실패했습니다."),
	DIARY_DAY_NOT_EXIST("-400", "오늘 작성된 일기가 없습니다."),

	TOKEN_EXPIRED("-1000", "토큰이 만료되었습니다."),
	REFRESH_TOKEN_EXPIRED("-1001", "토큰이 만료되었습니다."),
	TOKEN_NOT_FOUND_IN_COOKIE("-1002", "토큰이 없습니다."),

	MEMBER_NOT_FOUND("-2000", "회원이 존재하지 않습니다."),
	MEMBER_SIMILARITY_FAILED("-2001", "회원 유사도 스케쥴링에 실패했습니다."),

	MEMBER_ALREADY_PROCEED("-2002", "이미 하루가 시작된 회원입니다."),
	TODO_NOT_FOUND("-3000", "Todo가 존재하지 않습니다."),
	TODO_ALREADY_REGIST_TODAY("-3001", "이미 오늘 등록한 카테고리의 Todo입니다. 하루에 같은 카테고리 두번은 불가능합니다."),
	TODO_UPDATE_REQUEST_BY_OTHER_USER("-3002", "todo 주인이 아닌 다른 유저가 수정을 시도했습니다."),
	TODO_ALREADY_OVER_SEVEN("-3003", "이미 미리 등록된 오늘의 TODO 갯수가 7개 이상이라 추가적인 추천을 받지 않습니다."),

	CATEGORY_NOT_FOUND("-4000", "Category가 존재하지 않습니다."),

	CATEGORY_BLACKLIST_NOT_FOUND("-5000", "BlackList에 해당 MemberCategory가 존재하지 않습니다."),
	CATEGORY_BLACKLIST_ALREADY_FALSE("-5001", "BlackList에 이미 해당 MemberCategory가 풀리지 않은 상태로 존재하는 경우"),
	CATEGORY_BLACKLIST_ALREADY_TRUE("-5001", "BlackList에 이미 해당 MemberCategory가 풀려난 상태로 존재하는 경우"),

	CATEGORY_WHITELIST_NOT_FOUND("6000", "WhiteList에 해당 MemberCategory가 존재하지 않습니다."),

	HOBBY_NOT_FOUND("-7000", "해당 관심사가 존재하지 않습니다."),
	MEMBER_HOBBY_NOT_FOUND("-8000", "해당 멤버 관심사가 존재하지 않습니다."),
	MEMBER_HOBBY_IS_ALREADY_PRESENT("-8008", "이미 등록된 관심사입니다."),
	MBTI_NOT_FOUND("-9000", "MBTI가 존재하지 않습니다"),

	LOCATION_TRANSPORT_FAIL("-10000", "사용자 위경도 전송에 실패했습니다."),
	FASTAPI_CONNECTION_FAIL("-11111", "FastAPI 서버와 연결을 실패했습니다");

	private final String code;
	private final String message;
}
