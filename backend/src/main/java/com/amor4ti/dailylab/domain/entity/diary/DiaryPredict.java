package com.amor4ti.dailylab.domain.entity.diary;

import com.amor4ti.dailylab.domain.entity.Member;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DiaryPredict {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long diaryPredictId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memberId")
    private Member member;

    private String content;
    private LocalDate diaryDate;
}
