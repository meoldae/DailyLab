package com.amor4ti.dailylab.domain.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TodoReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long todoReportId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memberId")
    private Member member;

    private Long categoryId;
    private Long successCount;
    private Long failCount;
    private LocalDate firstRecommendDate;
    private LocalDate lastRecommendDate;

    @Builder
    public TodoReport(Long todoReportId, Member member, Long categoryId, Long successCount, Long failCount, LocalDate firstRecommendDate, LocalDate lastRecommendDate) {
        this.todoReportId = todoReportId;
        this.member = member;
        this.categoryId = categoryId;
        this.successCount = successCount;
        this.failCount = failCount;
        this.firstRecommendDate = firstRecommendDate;
        this.lastRecommendDate = lastRecommendDate;
    }

    public void updateSuccessCount() {
        this.successCount++;
    }

    public void updateFailCount() {
        this.failCount++;
    }

    public void updateLastRecommendDate(LocalDate todoDate) {
        this.lastRecommendDate = todoDate;
    }
}
