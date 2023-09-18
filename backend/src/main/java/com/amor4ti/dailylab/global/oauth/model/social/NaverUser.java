package com.amor4ti.dailylab.global.oauth.model.social;

import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.core.user.OAuth2User;

import com.amor4ti.dailylab.global.oauth.model.Attributes;
import com.amor4ti.dailylab.global.oauth.model.OAuth2ProviderUser;

public class NaverUser extends OAuth2ProviderUser {

    public NaverUser(Attributes attributes, OAuth2User oAuth2User, ClientRegistration clientRegistration) {
        super(attributes.getSubAttributes(),
                oAuth2User,
                clientRegistration);
    }

    @Override
    public String getId() {
        return (String) getAttributes().get("email");
    }

    @Override
    public String getUsername() {
        return (String) getAttributes().get("name");
    }

}
