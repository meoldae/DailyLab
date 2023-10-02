package com.amor4ti.dailylab.domain.taste.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.amor4ti.dailylab.domain.emotion.dto.response.EmotionCount;
import com.amor4ti.dailylab.domain.emotion.dto.response.MemberEmotionPeriodDto;
import com.amor4ti.dailylab.domain.emotion.service.EmotionService;
import com.amor4ti.dailylab.domain.entity.Member;
import com.amor4ti.dailylab.domain.entity.PersonalTasteAggregate;
import com.amor4ti.dailylab.domain.entity.TasteAggregate;
import com.amor4ti.dailylab.domain.member.repository.MemberRepository;
import com.amor4ti.dailylab.domain.taste.dto.TasteStatisticsDto;
import com.amor4ti.dailylab.domain.taste.dto.TasteSummaryDto;
import com.amor4ti.dailylab.domain.taste.dto.TasteVectorTable;
import com.amor4ti.dailylab.domain.taste.repository.PersonalTasteRepository;
import com.amor4ti.dailylab.domain.taste.repository.TasteAggregateRepository;
import com.amor4ti.dailylab.domain.taste.repository.TasteRepository;
import com.amor4ti.dailylab.global.exception.CustomException;
import com.amor4ti.dailylab.global.exception.ExceptionStatus;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class TasteServiceImpl implements TasteService {

	private final EmotionService emotionService;
	private final MemberRepository memberRepository;
	private final TasteRepository tasteRepository;
	private final TasteAggregateRepository tasteAggregateRepository;
	private final PersonalTasteRepository personalTasteRepository;

	@Override
	@Transactional
	public int getSelectTaste(Long memberId, LocalDate now) {
		List<MemberEmotionPeriodDto> queryResult = emotionService.getEmotionsBetweenDates(memberId, now.toString(),
			now.toString());

		if (queryResult.size() == 0) {
			// 감정을 넣은 적이 없다면...
			return 0;
		}

		int[] result = new int[15];

		MemberEmotionPeriodDto data = queryResult.get(0);

		List<EmotionCount> emotions = data.getEmotions();
		emotions.stream().forEach(emotion -> {
				int emotionId = Integer.parseInt(emotion.getEmotionId()) - 1;
				int count = emotion.getCount().intValue();

				for (int i = 0; i < TasteVectorTable.tasteVectorTable[emotionId].length; i++) {
					result[i] += TasteVectorTable.tasteVectorTable[emotionId][i] * count;
				}
			}
		);
		int maxValue = 0;
		int tasteIndex = 0;
		for (int i = result.length - 1; i >= 0; i--) {
			if (result[i] > maxValue) {
				maxValue = result[i];
				tasteIndex = i;
			}

		}
		return tasteIndex;
	}

	@Override
	@Transactional
	public TasteSummaryDto getTasteByDate(Long memberId, LocalDate date) {
		List<MemberEmotionPeriodDto> queryResult = emotionService.getEmotionsBetweenDates(memberId, date.toString(),
			date.toString());

		if (queryResult.size() == 0) {
			// 감정을 넣은 적이 없다면...
			TasteSummaryDto tasteSummaryDto = new TasteSummaryDto("아무런 맛이 나지 않아요.", "결과가 없어요.", "no_taste");
			return tasteSummaryDto;
		}

		int[] result = new int[15];

		MemberEmotionPeriodDto data = queryResult.get(0);

		List<EmotionCount> emotions = data.getEmotions();
		emotions.stream().forEach(emotion -> {
				int emotionId = Integer.parseInt(emotion.getEmotionId()) - 1;
				int count = emotion.getCount().intValue();

				for (int i = 0; i < TasteVectorTable.tasteVectorTable[emotionId].length; i++) {
					result[i] += TasteVectorTable.tasteVectorTable[emotionId][i] * count;
				}
			}
		);
		int maxValue = 0;
		int tasteIndex = 0;
		for (int i = result.length - 1; i >= 0; i--) {
			if (result[i] > maxValue) {
				maxValue = result[i];
				tasteIndex = i;
			}
		}

		return tasteRepository.findById(tasteIndex + 1).orElseThrow(
			() -> new CustomException(ExceptionStatus.EXCEPTION)
		);
	}

	@Override
	@Transactional
	public void updateTasteSummary(Long memberId) {
		LocalDate today = LocalDate.now();
		Member findMember = memberRepository.findById(memberId).orElseThrow(
			() -> new CustomException(ExceptionStatus.MEMBER_NOT_FOUND)
		);
		int selectTasteIndex = getSelectTaste(memberId, today);
		tasteAggregateRepository.findByDateAndGenderAndAgeGroup(today, findMember.getGender(),
			getAgeGroup(findMember.getBirthday())).ifPresentOrElse(
			tasteAggregate -> {
				int tasteValue = tasteAggregate.getTasteValue(selectTasteIndex);
				tasteAggregate.setTasteValue(selectTasteIndex, tasteValue + 1);
			},
			() -> {
				TasteAggregate tasteAggregate = new TasteAggregate();
				tasteAggregate.setDate(today);
				tasteAggregate.setAgeGroup(getAgeGroup(findMember.getBirthday()));
				tasteAggregate.setGender(findMember.getGender());
				tasteAggregate.setTasteValue(selectTasteIndex, 1);
				tasteAggregateRepository.save(tasteAggregate);
			}
		);
	}

	@Override
	public void updatePersonalTasteSummary(Long memberId) {
		LocalDate today = LocalDate.now();
		int selectTasteIndex = getSelectTaste(memberId, today);
		personalTasteRepository.findByIdAndDate(memberId, today)
			.ifPresentOrElse(
				personalTaste -> {
					log.info("=== personal Taste 있음!!");
					int tasteValue = personalTaste.getTasteValue(selectTasteIndex);
					personalTaste.setTasteValue(selectTasteIndex, tasteValue + 1);
				},
				() -> {
					log.info("=== personal Taste 없음!!");
					PersonalTasteAggregate personalTasteAggregate = new PersonalTasteAggregate();
					personalTasteAggregate.setTasteValue(selectTasteIndex, 1);
					personalTasteAggregate.setDate(today);
					personalTasteAggregate.setMemberId(memberId);
					personalTasteRepository.save(personalTasteAggregate);
				}
			);
	}

	@Override
	public TasteStatisticsDto getTasteSummary(Long memberId, String state, LocalDate startDate, LocalDate endDate) {
		Member findMember = memberRepository.findById(memberId).orElseThrow(
			() -> new CustomException(ExceptionStatus.MEMBER_NOT_FOUND)
		);
		int[] result = new int[15];
		List<TasteAggregate> tasteSummaryByRange = new ArrayList<>();
		if ("personal".equals(state)) {
			tasteSummaryByRange = personalTasteRepository.findAllByIdAndBetweenDate(memberId, startDate, endDate);
		} else if ("ageGender".equals(state)) {
			tasteSummaryByRange = tasteAggregateRepository.findAllByGenderAndAgeGroupBetweenDate(
				findMember.getGender(), getAgeGroup(findMember.getBirthday()), startDate, endDate);
		} else if ("total".equals(state)) {
			tasteSummaryByRange = tasteAggregateRepository.findAllByBetweenDate(startDate, endDate);
		}

		tasteSummaryByRange.stream().forEach(
			tasteSummary -> {
				int[] tasteSummaryList = tasteSummary.getTasteAggregateList();
				for (int i = 0; i < tasteSummaryList.length; i++) {
					result[i] += tasteSummaryList[i];
				}
			}
		);

		int[] major = new int[5];
		for (int i = 0; i < result.length; i++) {
			major[i / 3] += result[i];
		}
		// 최대 대분류 중에서 최대 항목
		int maxMajorValue = Arrays.stream(major).max().getAsInt();
		int maxMajorIndex = 0;
		for (int i = 0; i < major.length; i++) {
			if (maxMajorValue == major[i]) {
				maxMajorIndex = i;
				break;
			}
		}

		int maxIndex = maxMajorIndex;
		int maxValue = 0;
		for (int i = 0; i < 3; i++) {
			if (maxValue <= result[i + (maxMajorIndex*3)]) {
				maxValue = result[i + (maxMajorIndex*3)];
				maxIndex = i + (maxMajorIndex*3);
			}
		}

		TasteSummaryDto tasteSummaryDto = tasteRepository.findById(maxIndex + 1).orElseThrow(
				() -> new CustomException(ExceptionStatus.EXCEPTION)
		);
		TasteStatisticsDto tasteStatisticsDto = new TasteStatisticsDto(major, TasteVectorTable.tasteList[maxIndex], tasteSummaryDto.getImgSrc());
		return tasteStatisticsDto;
	}

	public String getAgeGroup(LocalDate birthday) {
		int ageGroup = (LocalDate.now().getYear() - birthday.getYear());
		if (ageGroup < 10) {
			return "미성년자";
		} else {
			return ((ageGroup / 10) * 10) + "대";
		}
	}
}
