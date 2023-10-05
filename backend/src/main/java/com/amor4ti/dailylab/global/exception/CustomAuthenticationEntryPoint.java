package com.amor4ti.dailylab.global.exception;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.amor4ti.dailylab.global.response.CommonResponse;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.setStatus(401);
		ObjectMapper objectMapper = new ObjectMapper();

		CommonResponse commonResponse = new CommonResponse();
		commonResponse.setCode(ExceptionStatus.TOKEN_EXPIRED.getCode());
		commonResponse.setMessage(ExceptionStatus.TOKEN_EXPIRED.getMessage());
		objectMapper.writeValue(response.getWriter(), commonResponse);
	}
}