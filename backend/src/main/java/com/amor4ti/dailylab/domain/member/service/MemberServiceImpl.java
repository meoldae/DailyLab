package com.amor4ti.dailylab.domain.member.service;

import com.amor4ti.dailylab.domain.entity.Hobby;
import com.amor4ti.dailylab.domain.entity.Mbti;
import com.amor4ti.dailylab.domain.entity.Member;
import com.amor4ti.dailylab.domain.entity.MemberStatus;
import com.amor4ti.dailylab.domain.hobby.service.MemberHobbyService;
import com.amor4ti.dailylab.domain.member.dto.*;
import com.amor4ti.dailylab.domain.member.mapper.MbtiMapper;
import com.amor4ti.dailylab.domain.member.mapper.MemberMapper;
import com.amor4ti.dailylab.domain.member.repository.MemberRepository;
import com.amor4ti.dailylab.domain.member.repository.MemberStatusRepository;
import com.amor4ti.dailylab.global.exception.CustomException;
import com.amor4ti.dailylab.global.exception.ExceptionStatus;
import com.amor4ti.dailylab.global.response.CommonResponse;
import com.amor4ti.dailylab.global.response.DataResponse;
import com.amor4ti.dailylab.global.response.ResponseService;
import com.amor4ti.dailylab.global.response.ResponseStatus;
import com.amor4ti.dailylab.global.util.CookieUtils;
import com.amor4ti.dailylab.global.util.JwtProvider;
import com.amor4ti.dailylab.global.util.WebClientUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

	@Value("${data-server-url}")
	private String DATA_SERVER_URL;

	private final MemberRepository memberRepository;
	private final MemberStatusRepository memberStatusRepository;

	private final JwtProvider jwtProvider;
	private final CookieUtils cookieUtils;

	private final ResponseService responseService;
	private final MemberHobbyService memberHobbyService;
	private final MbtiService mbtiService;

	private final MemberMapper memberMapper;

	private final WebClientUtil webClientUtil;

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
		System.out.println(mainMemberDto);
		return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, mainMemberDto);
	}

	@Override
	public DataResponse getMemberInfo(Long memberId) {
		Member findMember = memberRepository.findById(memberId).orElseThrow(
				() -> new CustomException(ExceptionStatus.MEMBER_NOT_FOUND)
		);
		MyPageDto myPageDto = memberMapper.memberToMyPage(findMember);

		return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, myPageDto);
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

	@Override
	public DataResponse getMemberStatus(Long memberId) {
		MemberStatusDto res = memberStatusRepository.findFirstByMemberIdOrderByDateDesc(memberId)
				.map(MemberStatusDto::of)
				.orElse(new MemberStatusDto(null, "init"));

		return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, res);
	}

	@Override
	public void updateStatusProceed(Long memberId, LocalDate date) {
		memberStatusRepository.save(MemberStatus.builder()
												.memberId(memberId)
												.date(date)
												.status("proceed")
												.build());
	}

	@Override
	public void updateStatusWait(Long memberId, LocalDate date) {
		MemberStatus memberStatus = memberStatusRepository.findByMemberIdAndDate(memberId, date)
														  .orElseThrow(() -> new CustomException(ExceptionStatus.MEMBER_NOT_FOUND));

		memberStatus.setStatus("wait");
		memberStatusRepository.save(memberStatus);
	}

	@Override
	public void updateStatusFinish(Long memberId, LocalDate date) {
		MemberStatus memberStatus = memberStatusRepository.findByMemberIdAndDate(memberId, date)
				.orElseThrow(() -> new CustomException(ExceptionStatus.MEMBER_NOT_FOUND));

		memberStatus.setStatus("finish");
		memberStatusRepository.save(memberStatus);
	}

	@Override
	public List getProceedMemberList(LocalDate date) {
		return memberStatusRepository.findMemberIdListByDateAndStatus(date, "proceed");
	}

	@Transactional
	@Override
	public CommonResponse exitMember(Long memberId) {
		Member findMember = memberRepository.findById(memberId).orElseThrow(
			() -> new CustomException(ExceptionStatus.MEMBER_NOT_FOUND)
		);

		findMember.exitMember();
		memberRepository.save(findMember);

		return responseService.successResponse(ResponseStatus.RESPONSE_SUCCESS);
	}

	@Override
	public List getMemberSimilarityList() {
		List<MemberSimilarityDto> memberSimilarityDtoList = memberRepository.findAllMemberSimilarityDto();
		memberSimilarityDtoList.stream().parallel().forEach(dto ->
			dto.setHobbyList(memberHobbyService.getHobbyIdListByMemberId(dto.getMemberId()))
		);
		return memberSimilarityDtoList;
	}

	@Override
	public CommonResponse startMemberStatus(Long memberId, LocalDate date) {
		Optional<MemberStatus> findMemberStatus = memberStatusRepository.findByMemberIdAndDate(memberId, date);

		if (findMemberStatus.isPresent()) {
			throw new CustomException(ExceptionStatus.MEMBER_ALREADY_PROCEED);
		}

		memberStatusRepository.save(MemberStatus.builder()
												.memberId(memberId)
												.date(date)
												.status("proceed")
												.build());

		return responseService.successResponse(ResponseStatus.ACCESS_MEMBER_PROCEED);
	}

	@Override
	public void updateStatusComplete(Long memberId, LocalDate date) {
		MemberStatus memberStatus = memberStatusRepository.findByMemberIdAndDate(memberId, date)
				.orElseThrow(() -> new CustomException(ExceptionStatus.MEMBER_NOT_FOUND));

		memberStatus.setStatus("complete");
		memberStatusRepository.save(memberStatus);
	}

	@Override
	@Retryable(
			maxAttempts = 3,
			backoff = @Backoff(delay = 100L)
	)
	public CommonResponse getMemberLocation(MemberLocationDto memberLocationDto, Long memberId) {
//		webClientUtil.post("http://localhost:8181" + "/location/" + memberId, memberLocationDto, Map.class)
		webClientUtil.post(DATA_SERVER_URL + "/location/" + memberId, memberLocationDto, Map.class)
				.subscribe(
						response -> {
							log.info("위경도 전송 성공!");
						},
						error -> {
							throw new CustomException(ExceptionStatus.LOCATION_TRANSPORT_FAIL);
						}
				);

        return responseService.successResponse(ResponseStatus.RESPONSE_SUCCESS);
    }

	@Override
	public DataResponse getMemberStatusByRange(Long memberId, Map<String, String> paramMap) {
		LocalDate startDay = LocalDate.parse(paramMap.get("startDay"));
		LocalDate endDay = LocalDate.parse(paramMap.get("endDay"));
		List<MemberStatusForCalendarDto> allStatusByRangeAndMemberId = memberRepository.findAllStatusByRangeAndMemberId(
			memberId, startDay, endDay);

		List<MemberStatusForCalendarDto> statusByRange = new ArrayList<>();

		while (!startDay.isAfter(endDay)) {
			boolean flag = false;
			for (MemberStatusForCalendarDto member : allStatusByRangeAndMemberId) {
				if (member.getSelectedDate().equals(startDay)) {
					statusByRange.add(member);
					flag = true;
					break;
				}
			}
			if (!flag) {
				statusByRange.add(new MemberStatusForCalendarDto(startDay, "X"));
			}
			startDay = startDay.plusDays(1);
		}

		return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, statusByRange);
	}

	@Override
	public void sendMemberInfotoFastAPI(Long memberId) {
		MemberInfoDto memberInfoDtoByMemberId = memberRepository.findMemberInfoDtoByMemberId(memberId);

		//		webClientUtil.post("http://localhost:8181" + "/location/" + memberId, memberLocationDto, Map.class)
		webClientUtil.post(DATA_SERVER_URL + "/" + memberId, memberInfoDtoByMemberId, Map.class)
				.subscribe(
						response -> {
							log.info("유저 정보 FastAPI로 전송 성공!");
						},
						error -> {
							throw new CustomException(ExceptionStatus.MEMBER_INFO_TRANSPORT_FAIL);
						}
				);


	}
}
