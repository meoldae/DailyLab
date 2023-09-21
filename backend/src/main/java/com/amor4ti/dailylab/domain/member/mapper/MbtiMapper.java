package com.amor4ti.dailylab.domain.member.mapper;

import com.amor4ti.dailylab.domain.entity.Mbti;
import com.amor4ti.dailylab.domain.member.dto.MemberMbtiDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MbtiMapper {
    MemberMbtiDto mbtiToMemberMbtiDto(Mbti mbti);
}
