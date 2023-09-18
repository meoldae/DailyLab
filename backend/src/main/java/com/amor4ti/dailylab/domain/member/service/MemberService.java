package com.amor4ti.dailylab.domain.member.service;

import com.amor4ti.dailylab.domain.member.dto.SignUpDto;
import com.amor4ti.dailylab.global.response.CommonResponse;

public interface MemberService {

	CommonResponse saveMember(SignUpDto signUpDto);
}
