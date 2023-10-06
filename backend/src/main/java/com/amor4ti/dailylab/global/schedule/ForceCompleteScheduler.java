package com.amor4ti.dailylab.global.schedule;

import java.time.LocalDate;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.amor4ti.dailylab.domain.diary.service.DiaryService;
import com.amor4ti.dailylab.domain.member.service.MemberService;
import com.amor4ti.dailylab.domain.todoReport.service.TodoReportService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class ForceCompleteScheduler {

	private final DiaryService diaryService;
	private final TodoReportService todoReportService;
	private final MemberService memberService;

	@Scheduled(cron = "0 0 6 * * *")
	public void forceCompleteDay() {
		LocalDate today = LocalDate.now().minusDays(1);
		List<Long> proceedMember1List = memberService.getProceedMemberList(today);
		log.info("스케쥴러 작동! 시간 : {} ", LocalDate.now() );
		// 확정 일기 생성 및 내일 Todo 추천
		proceedMember1List.stream().parallel().forEach(memberId -> {
			diaryService.createConfirmDiary(memberId, today);
			todoReportService.finishToday(memberId, today);
		});

		log.info("하루를 마무리 하지 않은 사용자들의 하루가 마무리 되었습니다.");
	}

}
