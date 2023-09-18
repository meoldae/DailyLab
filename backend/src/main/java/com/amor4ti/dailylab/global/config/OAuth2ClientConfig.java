package com.amor4ti.dailylab.global.config;

import lombok.RequiredArgsConstructor;

import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.amor4ti.dailylab.global.filter.CustomAuthenticationFilter;
import com.amor4ti.dailylab.global.oauth.handler.CustomOAuth2LoginFailureHandler;
import com.amor4ti.dailylab.global.oauth.handler.CustomOAuth2LoginSuccessHandler;
import com.amor4ti.dailylab.global.oauth.service.CustomOAuth2UserService;
import com.amor4ti.dailylab.global.oauth.service.CustomOidcUserService;
import com.amor4ti.dailylab.global.util.CustomAuthorityMapper;

@EnableWebSecurity
@RequiredArgsConstructor
public class OAuth2ClientConfig {

	private final CustomOAuth2UserService customOAuth2UserService;

	private final CustomOidcUserService customOidcUserService;
	private final CustomAuthenticationFilter customAuthenticationFilter;

	private final CustomOAuth2LoginFailureHandler customOAuth2LoginFailureHandler;
	private final CustomOAuth2LoginSuccessHandler customOAuth2LoginSuccessHandler;

	@Value("${auth.ignored-urls}")
	private String[] ignoredUrls;

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		// 기본 설정 및 Form 비활성화
		http
			.cors().configurationSource(corsConfigurationSource())
			.and()
			.sessionManagement()
			.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and()
			.csrf().disable()
			.formLogin().disable()
			.httpBasic().disable();

		// Custom Filter 
		http.authorizeRequests()
			.antMatchers(ignoredUrls).permitAll()
			.anyRequest().authenticated()
			.and()
			.addFilterBefore(customAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

		// OAuth
		http
			.oauth2Login(oAuth2
					-> oAuth2.userInfoEndpoint(userInfoEndpointConfig
					-> userInfoEndpointConfig
					.userService(customOAuth2UserService)
					.oidcUserService(customOidcUserService)
					.and()
					.successHandler(customOAuth2LoginSuccessHandler) // 인증 성공
					.failureHandler(customOAuth2LoginFailureHandler)) // 인증 실패
					.permitAll()
			);

		// API 요청
		// http
		// 	.exceptionHandling()
		// 	.authenticationEntryPoint(customAuthenticationEntryPoint) // 인가 실패
		// 	.accessDeniedHandler(customAccessDeniedHandler); // 인가 실패

		return http.build();
	}

	@Bean
	public GrantedAuthoritiesMapper customAuthorityMapper() {
		return new CustomAuthorityMapper();
	}

	// CORS 설정
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {

		CorsConfiguration corsConfiguration = new CorsConfiguration();

		corsConfiguration.addAllowedHeader("*");
		corsConfiguration.addAllowedMethod("*");
		corsConfiguration.addAllowedOriginPattern("*");
		corsConfiguration.addAllowedOrigin("https://j9b104.p.ssafy.io");
		corsConfiguration.addAllowedOrigin("http://localhost:3000");
		corsConfiguration.addAllowedOrigin("http://localhost:5173");

		corsConfiguration.setAllowCredentials(true);

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", corsConfiguration);
		return source;
	}
}