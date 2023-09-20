package com.amor4ti.dailylab.domain.diary.service;

import com.amor4ti.dailylab.domain.diary.dto.reqeust.RequestDiaryDto;
import com.amor4ti.dailylab.domain.diary.entity.DiaryPredict;
import com.amor4ti.dailylab.domain.diary.repository.DiaryPredictRepository;
import com.amor4ti.dailylab.domain.entity.Member;
import com.amor4ti.dailylab.domain.member.repository.MemberRepository;
import com.amor4ti.dailylab.global.util.WebClientUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Slf4j
@Service
@RequiredArgsConstructor
public class DiaryServiceImpl implements DiaryService {

    @Value("${data-server-url}")
    private String DATA_SERVER_URL;

    private final WebClientUtil webClientUtil;
    private final DiaryPredictRepository diaryPredictRepository;
    private final MemberRepository memberRepository;
    @Override
    public void createDefaultDiary(Long memberId, LocalDate date) {
//        Member member = memberRepository.(memberId).orElseThrow();

//        webClientUtil.post(DATA_SERVER_URL + "/diary/default", RequestDiaryDto.of(member), String.class)
//                .subscribe(
//                        response -> {
//                                diaryPredictRepository.save(DiaryPredict.builder()
//                                                                        .diaryDate(date)
//                                                                        .memberId(memberId)
//                                                                        .content(response).build());
//                            },
//                        error -> {
//                            error.printStackTrace();
//                        }
//                );
    }
}
