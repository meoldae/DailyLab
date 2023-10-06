package com.amor4ti.dailylab.domain.diary.dto.response;

import com.amor4ti.dailylab.domain.diary.entity.DiaryHistory;
import com.amor4ti.dailylab.domain.diary.entity.DiaryPredict;
import com.amor4ti.dailylab.domain.diary.entity.QDiaryHistory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ResponseDiaryDto {
    private String title;
    private String content;
    private String conclusion;
    private String advice;
    private String score;

    public static ResponseDiaryDto ofToday(DiaryPredict diaryPredict) {
        return ResponseDiaryDto.builder()
                .title(diaryPredict.getTitle())
                .content(diaryPredict.getContent())
                .build();
    }

    public static ResponseDiaryDto ofDate(DiaryHistory diaryHistory) {
        return ResponseDiaryDto.builder()
                .title(diaryHistory.getTitle())
                .content(diaryHistory.getContent())
                .conclusion(diaryHistory.getConclusion())
                .advice(diaryHistory.getAdvice())
                .score(diaryHistory.getScore())
                .build();
    }
}
