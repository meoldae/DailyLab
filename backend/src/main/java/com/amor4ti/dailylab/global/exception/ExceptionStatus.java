package com.amor4ti.dailylab.global.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ExceptionStatus {

	/* 예시 */
	EXCEPTION("-9999", "예외가 발생하였습니다."),

	TOKEN_EXPIRED("-1000", "토큰이 만료되었습니다."),
	REFRESH_TOKEN_EXPIRED("-1001", "토큰이 만료되었습니다."),
	TOKEN_NOT_FOUND_IN_COOKIE("-1002", "토큰이 없습니다."),

	MEMBER_NOT_FOUND("-2000", "회원이 존재하지 않습니다."),

	TODO_NOT_FOUND("-3000", "Todo가 존재하지 않습니다."),

	CATEGORY_NOT_FOUND("-4000", "Category가 존재하지 않습니다."),

	CATEGORY_BLACKLIST_NOT_FOUND("-5000", "BlackList에 해당 MemberCategory가 존재하지 않습니다."),
	CATEGORY_BLACKLIST_ALREADY_FALSE("-5001", "BlackList에 이미 해당 MemberCategory가 풀리지 않은 상태로 존재하는 경우"),
	CATEGORY_BLACKLIST_ALREADY_TRUE("-5001", "BlackList에 이미 해당 MemberCategory가 풀려난 상태로 존재하는 경우"),

	CATEGORY_WHITELIST_NOT_FOUND("6000", "WhiteList에 해당 MemberCategory가 존재하지 않습니다.");

	private final String code;
	private final String message;
}
