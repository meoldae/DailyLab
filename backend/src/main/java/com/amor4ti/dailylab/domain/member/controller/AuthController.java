package com.amor4ti.dailylab.domain.member.controller;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.amor4ti.dailylab.domain.member.service.AuthService;
import com.amor4ti.dailylab.global.exception.CustomException;
import com.amor4ti.dailylab.global.exception.ExceptionStatus;
import com.amor4ti.dailylab.global.response.DataResponse;
import com.amor4ti.dailylab.global.util.CookieUtils;
import com.amor4ti.dailylab.global.util.JwtProvider;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

	private final JwtProvider jwtProvider;
	private final CookieUtils cookieUtils;
	private final AuthService authService;
	private static final String REFRESH_TOKEN = "refreshToken";

	@PostMapping("/refresh")
	public DataResponse tokenRefresh(HttpServletRequest request){
		String accessToken = jwtProvider.getAccessToken(request);
		Cookie cookie = cookieUtils.getCookie(request, REFRESH_TOKEN).orElseThrow(
			() -> new CustomException(ExceptionStatus.TOKEN_NOT_FOUND_IN_COOKIE)
		);

		return authService.refresh(accessToken, cookie.getValue());
	}



}
