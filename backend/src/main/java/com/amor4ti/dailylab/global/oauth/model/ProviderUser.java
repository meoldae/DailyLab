package com.amor4ti.dailylab.global.oauth.model;

import java.util.List;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

public interface ProviderUser {

    String getId();
    String getUsername();
    String getPassword();
    String getEmail();
    String getProvider(); // 어떤 서비스인지 
    List<? extends GrantedAuthority> getAuthorities(); // 권한
    Map<String, Object> getAttributes();  // 서비스가 제공하는 유저 속성

    OAuth2User getOAuth2User();
}
