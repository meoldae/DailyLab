package com.amor4ti.dailylab.domain.member.service;

import com.amor4ti.dailylab.global.response.DataResponse;

public interface AuthService {
	DataResponse refresh(String accessToken, String refreshToken);
}
