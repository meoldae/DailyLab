package com.amor4ti.dailylab.global.oauth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.stereotype.Service;

import com.amor4ti.dailylab.global.oauth.converter.ProviderUserConverter;
import com.amor4ti.dailylab.global.oauth.converter.ProviderUserRequest;
import com.amor4ti.dailylab.global.oauth.model.ProviderUser;

import lombok.Getter;

@Service
@Getter
public abstract class AbstractOAuth2UserService {

    @Autowired
    private ProviderUserConverter<ProviderUserRequest, ProviderUser> providerUserConverter;

    protected ProviderUser providerUser(ProviderUserRequest providerUserRequest) {
        return providerUserConverter.convert(providerUserRequest);
    }
}
