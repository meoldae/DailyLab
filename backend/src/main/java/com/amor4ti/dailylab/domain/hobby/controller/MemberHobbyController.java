package com.amor4ti.dailylab.domain.hobby.controller;

import com.amor4ti.dailylab.domain.entity.Hobby;
import com.amor4ti.dailylab.domain.entity.Member;
import com.amor4ti.dailylab.domain.hobby.dto.MemberHobbyDto;
import com.amor4ti.dailylab.domain.hobby.service.MemberHobbyService;
import com.amor4ti.dailylab.global.response.CommonResponse;
import com.amor4ti.dailylab.global.response.DataResponse;
import com.amor4ti.dailylab.global.response.ResponseService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/hobby")
@RequiredArgsConstructor
public class MemberHobbyController {
    private final ResponseService responseService;
    private final MemberHobbyService memberHobbyService;

    @GetMapping
    public DataResponse getAllHobby(){
         return memberHobbyService.getAllHobby();
    }

    @PostMapping
    public CommonResponse registMemberHobby(@RequestParam Long hobbyId, Authentication authentication){
        Long memberId = Long.parseLong(authentication.getName());
        return memberHobbyService.registerHobby(memberId, hobbyId);
    }

    @DeleteMapping
    public CommonResponse deleteMemberHobby(@RequestParam Long hobbyId, Authentication authentication){
        Long memberId = Long.parseLong(authentication.getName());
        return memberHobbyService.deleteHobby(memberId, hobbyId);
    }
}
