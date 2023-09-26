package com.amor4ti.dailylab.global.schedule;

import java.time.LocalDate;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.amor4ti.dailylab.domain.diary.service.DiaryService;
import com.amor4ti.dailylab.domain.member.service.MemberService;
import com.amor4ti.dailylab.domain.todo.service.TodoService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class ForceCompleteScheduler {

	private final DiaryService diaryService;
	private final TodoService todoService;
	private final MemberService memberService;

	@Scheduled(cron = "30 0 0 * * *")
	@Transactional
	public void forceCompleteDay() {
		// 자정 ~ 새벽 06시 사이
		LocalDate today1 = LocalDate.now().minusDays(1);
		// 자정 이전
		LocalDate today2 = LocalDate.now();
		List<Long> proceedMember1List = memberService.getProceedMemberList(today1);
		List<Long> proceedMember2List = memberService.getProceedMemberList(today2);

		LocalDate tomorrow = LocalDate.now();

		// 확정 일기 생성 및 내일 Todo 추천
		proceedMember1List.stream().parallel().forEach(memberId -> {
			diaryService.createConfirmDiary(memberId, tomorrow);
			todoService.recommendTodo(memberId, tomorrow.toString());
		});

		// 확정 일기 생성 및 내일 Todo 추천
		proceedMember2List.stream().parallel().forEach(memberId -> {
			diaryService.createConfirmDiary(memberId, tomorrow);
			todoService.recommendTodo(memberId, tomorrow.toString());
		});

		log.info("하루를 마무리 하지 않은 사용자들 하루가 마무리 되었습니다.");
	}

}
