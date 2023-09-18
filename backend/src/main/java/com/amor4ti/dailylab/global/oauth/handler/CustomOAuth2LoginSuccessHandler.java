package com.amor4ti.dailylab.global.oauth.handler;

import java.io.IOException;
import java.util.Optional;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.amor4ti.dailylab.domain.entity.Member;
import com.amor4ti.dailylab.domain.member.repository.MemberRepository;
import com.amor4ti.dailylab.global.oauth.model.PrincipalUser;
import com.amor4ti.dailylab.global.oauth.model.ProviderUser;
import com.amor4ti.dailylab.global.util.CookieUtils;
import com.amor4ti.dailylab.global.util.JwtProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class CustomOAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

	private static final String REDIRECT_ENDPOINT = "https://j9b104.p.ssafy.io";

	private final MemberRepository memberRepository;
	private final JwtProvider jwtProvider;
	private final CookieUtils cookieUtils;

	private String redirectUrl;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) throws
		IOException {
		PrincipalUser principalUser = (PrincipalUser)authentication.getPrincipal();
		ProviderUser providerUser = principalUser.getProviderUser();

		Optional<Member> member = memberRepository.findByEmailAndProvider(providerUser.getEmail(),
			providerUser.getProvider());

		member.ifPresentOrElse(
			tempMember -> {
				if (tempMember.getBirthday() == null) {
					redirectUrl = REDIRECT_ENDPOINT + "/memberInfo?id=" + tempMember.getMemberId();
				} else {
					String accessToken = jwtProvider.createAccessToken(member.get());
					String refreshToken = jwtProvider.createRefreshToken();

					Cookie cookie = cookieUtils.createCookie(refreshToken);
					response.addCookie(cookie);

					redirectUrl = REDIRECT_ENDPOINT + "/oauth2/redirect?token=" + accessToken;
				}
			},
			() -> {
				Member newMember = Member.builder()
					.username(providerUser.getUsername())
					.provider(providerUser.getProvider())
					.email(providerUser.getEmail())
					.build();

				Member signupMember = memberRepository.save(newMember);
				redirectUrl = REDIRECT_ENDPOINT + "/memberInfo?id=" + signupMember.getMemberId();
			}
		);

		getRedirectStrategy().sendRedirect(request, response, redirectUrl);
	}



}