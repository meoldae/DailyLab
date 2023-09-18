package com.amor4ti.dailylab.domain.member.service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.amor4ti.dailylab.domain.entity.Member;
import com.amor4ti.dailylab.domain.member.dto.SignUpDto;
import com.amor4ti.dailylab.domain.member.repository.MemberRepository;
import com.amor4ti.dailylab.global.exception.CustomException;
import com.amor4ti.dailylab.global.exception.ExceptionStatus;
import com.amor4ti.dailylab.global.response.DataResponse;
import com.amor4ti.dailylab.global.response.ResponseService;
import com.amor4ti.dailylab.global.response.ResponseStatus;
import com.amor4ti.dailylab.global.util.CookieUtils;
import com.amor4ti.dailylab.global.util.JwtProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

	private final MemberRepository memberRepository;
	private final JwtProvider jwtProvider;
	private final CookieUtils cookieUtils;
	private final ResponseService responseService;

	@Override
	@Transactional
	public DataResponse saveMember(SignUpDto signUpDto, HttpServletResponse response) {
		Member findMember = memberRepository.findById(signUpDto.getMemberId()).orElseThrow(
			() -> new CustomException(ExceptionStatus.MEMBER_NOT_FOUND)
		);
		signUpDto.modifyMember(findMember);

		String accessToken = jwtProvider.createAccessToken(findMember);

		String refreshToken = jwtProvider.createRefreshToken();
		Cookie cookie = cookieUtils.createCookie(refreshToken);
		response.addCookie(cookie);

		return responseService.successDataResponse(ResponseStatus.SIGNUP_SUCCESS, accessToken);
	}
}
