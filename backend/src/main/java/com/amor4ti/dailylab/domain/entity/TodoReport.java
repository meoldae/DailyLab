package com.amor4ti.dailylab.domain.entity;

import lombok.AccessLevel;
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

    @PrePersist
    public void onPrePersist() {
        this.firstRecommendDate = LocalDate.now();
    }
}
