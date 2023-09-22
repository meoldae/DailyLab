package com.amor4ti.dailylab.global.oauth.converter;

import com.amor4ti.dailylab.global.oauth.enums.SocialProvider;
import com.amor4ti.dailylab.global.oauth.model.ProviderUser;
import com.amor4ti.dailylab.global.oauth.model.social.GoogleUser;
import com.amor4ti.dailylab.global.util.OAuth2Utils;

public final class GoogleOAuth2ProviderUserConverter implements ProviderUserConverter<ProviderUserRequest, ProviderUser> {

	@Override
	public ProviderUser convert(ProviderUserRequest providerUserRequest) {

		if (!providerUserRequest.getClientRegistration().getRegistrationId().equals(SocialProvider.GOOGLE.getSocialProvider())){
			return null;
		}
		return new GoogleUser(
			OAuth2Utils.getMainAttributes(providerUserRequest.getOAuth2User()),
			providerUserRequest.getOAuth2User(),
			providerUserRequest.getClientRegistration());
	}
}
