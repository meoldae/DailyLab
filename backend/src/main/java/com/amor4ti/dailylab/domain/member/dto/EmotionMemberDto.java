package com.amor4ti.dailylab.domain.member.dto;

import com.amor4ti.dailylab.domain.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
@AllArgsConstructor
public class EmotionMemberDto {
    private Long memberId;

    private LocalDate birthday;
    private String gender;

    public static EmotionMemberDto of(Member member) {
        return EmotionMemberDto.builder()
                               .memberId(member.getMemberId())
                               .birthday(member.getBirthday())
                               .gender(member.getGender())
                               .build();
    }
}
