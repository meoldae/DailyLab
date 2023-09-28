package com.amor4ti.dailylab.domain.taste.controller;

import java.time.LocalDate;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.amor4ti.dailylab.domain.taste.dto.TasteStatisticsDto;
import com.amor4ti.dailylab.domain.taste.dto.TasteSummaryDto;
import com.amor4ti.dailylab.domain.taste.dto.TasteVectorTable;
import com.amor4ti.dailylab.domain.taste.service.TasteService;
import com.amor4ti.dailylab.global.response.DataResponse;
import com.amor4ti.dailylab.global.response.ResponseService;
import com.amor4ti.dailylab.global.response.ResponseStatus;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/taste")
@RequiredArgsConstructor
public class TasteController {

	private final ResponseService responseService;
	private final TasteService tasteService;

	@GetMapping
	private DataResponse getTasteByDate(Authentication authentication, @RequestParam("date") LocalDate date) {
		Long memberId = Long.parseLong(authentication.getName());
		TasteSummaryDto tasteByDate = tasteService.getTasteByDate(memberId, date);
		return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, tasteByDate);
	}

	@GetMapping("/statistics")
	private DataResponse getTasteSummary(Authentication authentication,
									@RequestParam("state") String state,
									@RequestParam("startDate") LocalDate startDate,
									@RequestParam("endDate") LocalDate endDate) {
		Long memberId = Long.parseLong(authentication.getName());
		TasteStatisticsDto tasteSummary = tasteService.getTasteSummary(memberId, state, startDate, endDate);
		return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, tasteSummary);
	}
}
