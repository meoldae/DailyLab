package com.amor4ti.dailylab.domain.member.service;

import com.amor4ti.dailylab.domain.entity.Member;
import com.amor4ti.dailylab.domain.hobby.service.MemberHobbyService;
import com.amor4ti.dailylab.domain.member.dto.MainMemberDto;
import com.amor4ti.dailylab.domain.member.dto.SignUpDto;
import com.amor4ti.dailylab.domain.member.dto.UpdateMemberDto;
import com.amor4ti.dailylab.domain.member.repository.MemberRepository;
import com.amor4ti.dailylab.global.exception.CustomException;
import com.amor4ti.dailylab.global.exception.ExceptionStatus;
import com.amor4ti.dailylab.global.response.CommonResponse;
import com.amor4ti.dailylab.global.response.DataResponse;
import com.amor4ti.dailylab.global.response.ResponseService;
import com.amor4ti.dailylab.global.response.ResponseStatus;
import com.amor4ti.dailylab.global.util.CookieUtils;
import com.amor4ti.dailylab.global.util.JwtProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

	private final MemberRepository memberRepository;
	private final JwtProvider jwtProvider;
	private final CookieUtils cookieUtils;
	private final ResponseService responseService;
	private final MemberHobbyService memberHobbyService;

	@Override
	@Transactional
	public DataResponse saveMember(SignUpDto signUpDto, HttpServletResponse response) {
		Member findMember = memberRepository.findById(signUpDto.getMemberId()).orElseThrow(
			() -> new CustomException(ExceptionStatus.MEMBER_NOT_FOUND)
		);
		
		findMember.setBirthday(signUpDto.getBirthDay());
		findMember.setGender(signUpDto.getGender());
		// Dirty Checking 이상으로 Save 호출
		memberRepository.save(findMember);
		
		String accessToken = jwtProvider.createAccessToken(findMember);

		String refreshToken = jwtProvider.createRefreshToken();
		Cookie cookie = cookieUtils.createCookie(refreshToken);
		response.addCookie(cookie);

		return responseService.successDataResponse(ResponseStatus.SIGNUP_SUCCESS, accessToken);
	}

	@Override
	public DataResponse getMainMemberDto(Long memberId) {
		MainMemberDto mainMemberDto = memberRepository.findMainMemberDtoByMemberId(memberId).orElseThrow(
				() -> new CustomException(ExceptionStatus.MEMBER_NOT_FOUND)
		);
		return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, mainMemberDto);
	}

	@Transactional
	@Override
	public CommonResponse updateMemberInfo(Long memberId, UpdateMemberDto updateMemberDto) {
		Member findMember = memberRepository.findById(memberId).orElseThrow(
				() -> new CustomException(ExceptionStatus.MEMBER_NOT_FOUND)
		);

		findMember.updateMember(updateMemberDto);
		// Dirty Checking 이상으로 Save 호출
		memberRepository.save(findMember);
		
		// TODO Hobby List 반영 필요
		
		return responseService.successResponse(ResponseStatus.RESPONSE_SUCCESS);
	}
}
