package com.amor4ti.dailylab.global.schedule;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.amor4ti.dailylab.domain.member.dto.MemberSimilarityDto;
import com.amor4ti.dailylab.domain.member.service.MemberService;
import com.amor4ti.dailylab.global.exception.CustomException;
import com.amor4ti.dailylab.global.exception.ExceptionStatus;
import com.amor4ti.dailylab.global.util.WebClientUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class MemberSimilarityScheduler {

	@Value("${data-server-url}")
	private String DATA_SERVER_URL;
	private final MemberService memberService;
	private final WebClientUtil webClientUtil;

	@Scheduled(cron = "0 0 6 * * *")
	@Transactional
	@Retryable(
		maxAttempts = 3,
		backoff = @Backoff(delay = 100L)
	)
	public void MemberSimilaritySchedule() {
		List<MemberSimilarityDto> memberSimilarityList = memberService.getMemberSimilarityList();
		webClientUtil.post(DATA_SERVER_URL + "/member", memberSimilarityList, List.class)
			.subscribe(
				response -> {
					log.info("Member Similarity 전송 완료");
				},
				error -> {
					log.info("Member Similarity 스케쥴링 실패");
					new CustomException(ExceptionStatus.MEMBER_SIMILARITY_FAILED);
				}
			);
	}
}
