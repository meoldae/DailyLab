package com.amor4ti.dailylab.global.oauth.converter;

import java.util.Arrays;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

import com.amor4ti.dailylab.global.oauth.model.ProviderUser;

@Component
public final class DelegatingProviderUserConverter implements ProviderUserConverter<ProviderUserRequest, ProviderUser> {

	private List<ProviderUserConverter<ProviderUserRequest, ProviderUser>> converters;

	public DelegatingProviderUserConverter() {
		List<ProviderUserConverter<ProviderUserRequest, ProviderUser>> providerUserConverters =
			Arrays.asList(new GoogleOAuth2ProviderUserConverter(),
						new NaverOAuth2ProviderUserConverter(),
						new KakaoOAuth2ProviderUserConverter(),
						new KakaoOAuth2OidcProviderUserConverter());

		this.converters = Collections.unmodifiableList(new LinkedList<>(providerUserConverters));
	}

	// Google, Naver, Kakao 구현체에게 Converting 위임
	@Override
	public ProviderUser convert(ProviderUserRequest providerUserRequest) {

		Assert.notNull(providerUserRequest, "providerUserRequest는 NULL일 수 없습니다.");

		for (ProviderUserConverter<ProviderUserRequest, ProviderUser> converter : this.converters) {
			ProviderUser providerUser = converter.convert(providerUserRequest);
			if (providerUser != null)
				return providerUser;
		}

		return null;
	}
}
