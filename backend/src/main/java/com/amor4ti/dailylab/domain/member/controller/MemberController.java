package com.amor4ti.dailylab.domain.member.controller;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.amor4ti.dailylab.domain.member.dto.MemberMbtiDto;
import com.amor4ti.dailylab.domain.member.dto.UpdateMemberDto;
import lombok.Data;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

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
	public DataResponse getMainMember(Authentication authentication) {
		Long memberId = Long.parseLong(authentication.getName());
		return memberService.getMainMemberDto(memberId);
	}


	@GetMapping("/mypage")
	public DataResponse getMemberInfo(Authentication authentication) {
		Long memberId = Long.parseLong(authentication.getName());
		return memberService.getMemberInfo(memberId);
	}

	@PostMapping("/modify")
	public CommonResponse updateMember(@RequestBody UpdateMemberDto updateMemberDto, Authentication authentication){
		Long memberId = Long.parseLong(authentication.getName());
		return memberService.updateMemberInfo(memberId, updateMemberDto);
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
		Long memberId = Long.parseLong(authentication.getName());
		return memberService.getHobbyList(memberId);
	}

	@GetMapping("/goal")
	public DataResponse getGoal(Authentication authentication){
		Long memberId = Long.parseLong(authentication.getName());
		return memberService.getGoal(memberId);
	}

	@PostMapping("/goal")
	public CommonResponse updateGoal(@RequestBody String goal, Authentication authentication){
		Long memberId = Long.parseLong(authentication.getName());
		return memberService.updateGoal(goal, memberId);
	}

	@GetMapping("/job")
	public DataResponse getJob(Authentication authentication){
		Long memberId = Long.parseLong(authentication.getName());
		return memberService.getJob(memberId);
	}

	@PostMapping("/job")
	public CommonResponse updateJob(@RequestBody String job, Authentication authentication){
		Long memberId = Long.parseLong(authentication.getName());
		return memberService.updateJob(job, memberId);
	}

	@GetMapping("/mbti")
	public DataResponse getMbti(Authentication authentication){
		Long memberId = Long.parseLong(authentication.getName());
		return memberService.getMbti(memberId);
	}

	@PostMapping("/mbti")
	public CommonResponse updateMbti(@RequestBody MemberMbtiDto memberMbtiDto, Authentication authentication){
		Long memberId = Long.parseLong(authentication.getName());
		return memberService.updateMbti(memberMbtiDto, memberId);
	}

	@GetMapping("/religion")
	public DataResponse getReligion(Authentication authentication){
		Long memberId = Long.parseLong(authentication.getName());
		return memberService.getReligion(memberId);
	}

	@PostMapping("/religion")
	public CommonResponse updateReligion(@RequestBody String religion, Authentication authentication){
		Long memberId = Long.parseLong(authentication.getName());
		return memberService.updateReligion(religion, memberId);
	}

	@GetMapping("/flask")
	public DataResponse getMemberFlask(Authentication authentication){
		Long memberId = Long.parseLong(authentication.getName());
		return memberService.getMemberFlask(memberId);
	}

	@GetMapping("/status")
	public DataResponse getMemberStatus(Authentication authentication) {
		Long memberId = Long.parseLong(authentication.getName());
		return memberService.getMemberStatus(memberId);
	}
}
