package com.amor4ti.dailylab.domain.member.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.amor4ti.dailylab.domain.entity.Member;
import com.amor4ti.dailylab.domain.member.dto.SignUpDto;
import com.amor4ti.dailylab.domain.member.service.MemberService;
import com.amor4ti.dailylab.global.response.CommonResponse;
import com.amor4ti.dailylab.global.response.DataResponse;
import com.amor4ti.dailylab.global.util.JwtProvider;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

	private final MemberService memberService;
	private final JwtProvider jwtProvider;

	@PostMapping("/signup")
	public CommonResponse signUp(@RequestBody SignUpDto signUpDto){
		return memberService.saveMember(signUpDto);
	}

	@GetMapping("/info")
	public DataResponse<Member> getMemberInfo(Authentication authentication) {

		return null;
	}
}
