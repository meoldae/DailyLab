package com.amor4ti.dailylab.domain.member.controller;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.amor4ti.dailylab.domain.member.dto.UpdateMemberDto;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.amor4ti.dailylab.domain.entity.Member;
import com.amor4ti.dailylab.domain.member.dto.SignUpDto;
import com.amor4ti.dailylab.domain.member.service.MemberService;
import com.amor4ti.dailylab.global.exception.CustomException;
import com.amor4ti.dailylab.global.exception.ExceptionStatus;
import com.amor4ti.dailylab.global.response.CommonResponse;
import com.amor4ti.dailylab.global.response.DataResponse;
import com.amor4ti.dailylab.global.response.ResponseService;
import com.amor4ti.dailylab.global.response.ResponseStatus;
import com.amor4ti.dailylab.global.util.CookieUtils;
import com.amor4ti.dailylab.global.util.JwtProvider;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

	private final ResponseService responseService;
	private final MemberService memberService;
	private final JwtProvider jwtProvider;
	private final CookieUtils cookieUtils;
	private static final String REFRESH_TOKEN = "refreshToken";

	@PostMapping("/signup")
	public DataResponse signUp(@RequestBody SignUpDto signUpDto, HttpServletResponse response){
		return memberService.saveMember(signUpDto, response);
	}

	@GetMapping("/info")
	public DataResponse getMemberInfo(Authentication authentication) {
		Member member = (Member) authentication.getPrincipal();
		return memberService.getMainMemberDto(member.getMemberId());
	}

	@PostMapping("/modify")
	public CommonResponse updateMember(@RequestBody UpdateMemberDto updateMemberDto, Authentication authentication){
		Member member = (Member) authentication.getPrincipal();
		return memberService.updateMemberInfo(member.getMemberId(), updateMemberDto);
	}


	@DeleteMapping("/logout")
	public CommonResponse logout(HttpServletRequest request, HttpServletResponse response) {
		Cookie cookie = cookieUtils.getCookie(request, REFRESH_TOKEN).orElseThrow(
			() -> new CustomException(ExceptionStatus.TOKEN_NOT_FOUND_IN_COOKIE)
		);
		cookie.setMaxAge(0);
		response.addCookie(cookie);
		return responseService.successResponse(ResponseStatus.LOGOUT_SUCCESS);
	}

	@GetMapping("/hobby")
	public DataResponse getHobbyList(Authentication authentication){
		Member member = (Member) authentication.getPrincipal();
		return memberService.getHobbyList(member.getMemberId());
	}
}
