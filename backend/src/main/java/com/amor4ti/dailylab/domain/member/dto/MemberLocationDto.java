package com.amor4ti.dailylab.domain.member.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberLocationDto {

    private float latitude;
    private float longitude;

    @Builder
    public MemberLocationDto(float latitude, float longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
