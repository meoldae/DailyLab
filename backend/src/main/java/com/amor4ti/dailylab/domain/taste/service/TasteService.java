package com.amor4ti.dailylab.domain.taste.service;

import java.time.LocalDate;

import org.springframework.transaction.annotation.Transactional;

import com.amor4ti.dailylab.domain.taste.dto.TasteStatisticsDto;
import com.amor4ti.dailylab.domain.taste.dto.TasteSummaryDto;

public interface TasteService {
	@Transactional
	int getSelectTaste(Long memberId, LocalDate now);

	@Transactional
	TasteSummaryDto getTasteByDate(Long memberId, LocalDate date);

	@Transactional
	void updateTasteSummary(Long memberId);

	void updatePersonalTasteSummary(Long memberId);

	TasteStatisticsDto getTasteSummary(Long memberId, String state, LocalDate startDate, LocalDate endDate);
}
