package com.amor4ti.dailylab.domain.member.service;

import com.amor4ti.dailylab.domain.entity.Hobby;
import com.amor4ti.dailylab.domain.entity.Mbti;
import com.amor4ti.dailylab.domain.entity.Member;
import com.amor4ti.dailylab.domain.hobby.service.MemberHobbyService;
import com.amor4ti.dailylab.domain.member.dto.MainMemberDto;
import com.amor4ti.dailylab.domain.member.dto.MemberMbtiDto;
import com.amor4ti.dailylab.domain.member.dto.SignUpDto;
import com.amor4ti.dailylab.domain.member.dto.UpdateMemberDto;
import com.amor4ti.dailylab.domain.member.mapper.MbtiMapper;
import com.amor4ti.dailylab.domain.member.mapper.MemberMapper;
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
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

	private final MemberRepository memberRepository;
	private final JwtProvider jwtProvider;
	private final CookieUtils cookieUtils;
	private final ResponseService responseService;
	private final MemberHobbyService memberHobbyService;
	private final MbtiService mbtiService;

	private final MemberMapper memberMapper;

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
	public DataResponse getMemberInfo(Long memberId) {
		Member findMember = memberRepository.findById(memberId).orElseThrow(
				() -> new CustomException(ExceptionStatus.MEMBER_NOT_FOUND)
		);
		MainMemberDto mainMemberDto = memberMapper.memberToMainMember(findMember);

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


		
		return responseService.successResponse(ResponseStatus.RESPONSE_SUCCESS);
	}

	@Override
	public DataResponse getHobbyList(Long memberId) {
		List<Hobby> hobbyList = memberHobbyService.getHobbyListByMemberId(memberId);
		return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, hobbyList);
	}

	@Override
	public DataResponse getGoal(Long memberId) {
		Member findMember = memberRepository.findById(memberId).orElseThrow(
				() -> new CustomException(ExceptionStatus.MEMBER_NOT_FOUND)
		);
		String goal = findMember.getGoal();

		return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, goal);
	}

	@Override
	public CommonResponse updateGoal(String goal, Long memberId) {
		Member findMember = memberRepository.findById(memberId).orElseThrow(
				() -> new CustomException(ExceptionStatus.MEMBER_NOT_FOUND)
		);
		findMember.setGoal(goal);
		memberRepository.save(findMember);
		return responseService.successResponse(ResponseStatus.RESPONSE_SUCCESS);
	}

	@Override
	public DataResponse getJob(Long memberId) {
		Member findMember = memberRepository.findById(memberId).orElseThrow(
				() -> new CustomException(ExceptionStatus.MEMBER_NOT_FOUND)
		);
		String job = findMember.getJob();

		return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, job);
	}

	@Override
	public CommonResponse updateJob(String job, Long memberId) {
		Member findMember = memberRepository.findById(memberId).orElseThrow(
				() -> new CustomException(ExceptionStatus.MEMBER_NOT_FOUND)
		);
		findMember.setJob(job);
		memberRepository.save(findMember);
		return responseService.successResponse(ResponseStatus.RESPONSE_SUCCESS);
	}

	@Override
	public DataResponse getMbti(Long memberId) {
		Member findMember = memberRepository.findById(memberId).orElseThrow(
				() -> new CustomException(ExceptionStatus.MEMBER_NOT_FOUND)
		);
		MemberMbtiDto memberMbtiDto = mbtiService.getMbti(findMember.getMbtiId());


		return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, memberMbtiDto);
	}

	@Override
	public CommonResponse updateMbti(MemberMbtiDto memberMbtiDto, Long memberId) {
		Member findMember = memberRepository.findById(memberId).orElseThrow(
				() -> new CustomException(ExceptionStatus.MEMBER_NOT_FOUND)
		);
		Mbti mbti = mbtiService.getMbtiByDto(memberMbtiDto);
		findMember.setMbtiId(mbti.getMbtiId());
		memberRepository.save(findMember);
		return responseService.successResponse(ResponseStatus.RESPONSE_SUCCESS);
	}

	@Override
	public DataResponse getReligion(Long memberId) {
		Member findMember = memberRepository.findById(memberId).orElseThrow(
				() -> new CustomException(ExceptionStatus.MEMBER_NOT_FOUND)
		);
		String religion = findMember.getReligion();

		return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, religion);
	}

	@Override
	public CommonResponse updateReligion(String religion, Long memberId) {
		Member findMember = memberRepository.findById(memberId).orElseThrow(
				() -> new CustomException(ExceptionStatus.MEMBER_NOT_FOUND)
		);
		findMember.setReligion(religion);
		memberRepository.save(findMember);
		return responseService.successResponse(ResponseStatus.RESPONSE_SUCCESS);
	}


	@Override
	public DataResponse getMemberFlask(Long memberId) {
		Member findMember = memberRepository.findById(memberId).orElseThrow(
				() -> new CustomException(ExceptionStatus.MEMBER_NOT_FOUND)
		);
		List<Hobby> hobbyList = memberHobbyService.getHobbyListByMemberId(memberId);
		UpdateMemberDto memberInfo = memberMapper.memberToUpdateMember(findMember, hobbyList);

		return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, memberInfo);
	}
}
