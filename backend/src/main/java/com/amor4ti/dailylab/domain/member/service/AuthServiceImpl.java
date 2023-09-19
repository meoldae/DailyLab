package com.amor4ti.dailylab.domain.member.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.amor4ti.dailylab.domain.entity.Member;
import com.amor4ti.dailylab.domain.member.repository.MemberRepository;
import com.amor4ti.dailylab.global.exception.CustomException;
import com.amor4ti.dailylab.global.exception.ExceptionStatus;
import com.amor4ti.dailylab.global.response.DataResponse;
import com.amor4ti.dailylab.global.response.ResponseService;
import com.amor4ti.dailylab.global.response.ResponseStatus;
import com.amor4ti.dailylab.global.util.CookieUtils;
import com.amor4ti.dailylab.global.util.JwtProvider;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{

	private final JwtProvider jwtProvider;
	private final ResponseService responseService;
	private final MemberRepository memberRepository;

	@Override
	public DataResponse refresh(String accessToken, String refreshToken) {

		// 만료 X
		if (!jwtProvider.isExpired(refreshToken)) {
			Long memberId = jwtProvider.getClaimFromToken(accessToken, "memberId");
			Member findMember = memberRepository.findById(memberId).orElseThrow(
				() -> new CustomException(ExceptionStatus.MEMBER_NOT_FOUND)
			);
			String newAccessToken = jwtProvider.createAccessToken(findMember);
			return responseService.successDataResponse(ResponseStatus.ACCESS_TOKEN_REFRESHED, newAccessToken);
		}

		// 만료 O
		throw new CustomException(ExceptionStatus.REFRESH_TOKEN_EXPIRED);
	}
}
