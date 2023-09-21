package com.amor4ti.dailylab.domain.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDate;

@Getter
@Entity
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class MemberStatus {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberStatusId;

    private Long memberId;
    private LocalDate date;
    private String status;

    public void setStatus(String status) {
        this.status = status;
    }
}
