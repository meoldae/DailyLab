package com.amor4ti.dailylab.domain.member.mapper;

import com.amor4ti.dailylab.domain.entity.Hobby;
import com.amor4ti.dailylab.domain.entity.Member;
import com.amor4ti.dailylab.domain.member.dto.MainMemberDto;
import com.amor4ti.dailylab.domain.member.dto.MyPageDto;
import com.amor4ti.dailylab.domain.member.dto.UpdateMemberDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    UpdateMemberDto memberToUpdateMember(Member member, List<Hobby> hobbyList);
    MyPageDto memberToMyPage(Member member);
}
