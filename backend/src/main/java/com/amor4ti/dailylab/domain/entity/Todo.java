package com.amor4ti.dailylab.domain.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long todoId;

    @ManyToOne
    @JoinColumn(name = "memberId")
    private Member member;
    private String content;

    private LocalDate createdDate;
    private LocalDateTime checkedDate;
    private boolean isSystem;
    private boolean isDeleted;

    @PrePersist
    public void onPrePersist() {
        this.createdDate = LocalDate.now();
    }
}
