package com.amor4ti.dailylab.domain.member.controller;

import com.amor4ti.dailylab.domain.entity.Member;
import com.amor4ti.dailylab.domain.member.dto.UpdateJobDto;
import com.amor4ti.dailylab.domain.member.service.MemberInfoService;
import com.amor4ti.dailylab.global.response.CommonResponse;
import com.amor4ti.dailylab.global.response.DataResponse;
import com.amor4ti.dailylab.global.response.ResponseService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/info")
@RequiredArgsConstructor
public class MemberInfoController {
    private final MemberInfoService memberInfoService;

    @GetMapping("")
    public DataResponse getMemberInfo(Authentication authentication) {
        Member member = (Member) authentication.getPrincipal();
        return memberInfoService.getMemberInfo(member.getMemberId());
    }

    @PostMapping("/job")
    public CommonResponse selectJob(@RequestBody UpdateJobDto updateJobDto, Authentication authentication){
        Member member = (Member) authentication.getPrincipal();
        return memberInfoService.updateMemberJob(member.getMemberId(), updateJobDto);
    }
}
