package com.amor4ti.dailylab.domain.taste.service;

import java.time.LocalDate;

import org.springframework.transaction.annotation.Transactional;

import com.amor4ti.dailylab.domain.taste.dto.TasteStatisticsDto;

public interface TasteService {
	@Transactional
	int getSelectTaste(Long memberId, LocalDate now);

	@Transactional
	void updateTasteSummary(Long memberId);

	TasteStatisticsDto getTasteSummary(Long memberId, LocalDate startDate, LocalDate endDate);
}
