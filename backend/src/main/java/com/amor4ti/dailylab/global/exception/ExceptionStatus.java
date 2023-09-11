package com.amor4ti.dailylab.global.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ExceptionStatus {

	/* 예시 */
	EXCEPTION("9999", "예외가 발생하였습니다.");

	private final String code;
	private final String message;
}
