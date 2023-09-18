package com.amor4ti.dailylab.global.oauth.converter;

import com.amor4ti.dailylab.global.oauth.enums.AttributesKey;
import com.amor4ti.dailylab.global.oauth.enums.SocialProvider;
import com.amor4ti.dailylab.global.oauth.model.ProviderUser;
import com.amor4ti.dailylab.global.oauth.model.social.NaverUser;
import com.amor4ti.dailylab.global.util.OAuth2Utils;

public final class NaverOAuth2ProviderUserConverter implements ProviderUserConverter<ProviderUserRequest, ProviderUser> {

	@Override
	public ProviderUser convert(ProviderUserRequest providerUserRequest) {
		if (!providerUserRequest.getClientRegistration().getRegistrationId().equals(SocialProvider.NAVER.getSocialProvider())){
			return null;
		}
		return new NaverUser(
			OAuth2Utils.getSubAttributes(providerUserRequest.getOAuth2User(), AttributesKey.NAVER_SUB_ATTRIBUTES_KEY.getKey()),
			providerUserRequest.getOAuth2User(),
			providerUserRequest.getClientRegistration());
	}
}
