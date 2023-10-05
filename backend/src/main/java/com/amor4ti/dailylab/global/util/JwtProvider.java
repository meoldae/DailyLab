package com.amor4ti.dailylab.global.util;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.amor4ti.dailylab.domain.entity.Member;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtProvider {

	@Value("${auth.secretKey}")
	private String SECRET_KEY;

	//    private static final Long ACCESS_TOKEN_VALIDATE_TIME = 1000L * 60 * 30; // 30분
	private static final Long ACCESS_TOKEN_VALIDATE_TIME = 1000L * 60 * 60 * 24; // 테스트용 24시간
	private static final Long REFRESH_TOKEN_VALIDATE_TIME = 1000L * 60 * 60 * 24 * 365; // 1년

	public String createAccessToken(Member member) {
		Date now = new Date();
		Date expireDate = new Date(now.getTime() + ACCESS_TOKEN_VALIDATE_TIME);

		Map<String, Object> payloads = new HashMap<>();
		payloads.put("memberId", Long.toString(member.getMemberId()));
		payloads.put("provider", member.getProvider());

		return Jwts.builder()
			.setClaims(payloads)
			.setSubject("auth")
			.setIssuedAt(now)
			.setExpiration(expireDate)
			.signWith(SignatureAlgorithm.HS512, SECRET_KEY.getBytes())
			.compact();
	}

	public String createRefreshToken() {
		Date now = new Date();
		Date expireDate = new Date(now.getTime() + REFRESH_TOKEN_VALIDATE_TIME);

		return Jwts.builder()
			.setSubject("refresh")
			.setIssuedAt(now)
			.setExpiration(expireDate)
			.signWith(SignatureAlgorithm.HS512, SECRET_KEY.getBytes())
			.compact();
	}

	public boolean validateToken(String token) {
		try {
			Jwts.parser().setSigningKey(SECRET_KEY.getBytes()).parseClaimsJws(token);
			return true;
		} catch (MalformedJwtException e) { // 유효하지 않은 JWT
			throw new MalformedJwtException("jwt not valid");
		} catch (ExpiredJwtException e) { // 만료된 JWT
			throw new ExpiredJwtException(null, null, "expired");
		} catch (UnsupportedJwtException e) { // 지원하지 않는 JWT
			throw new UnsupportedJwtException("unsupported jwt");
		} catch (IllegalArgumentException e) { // 빈값
			throw new IllegalArgumentException("empty jwt");
		}
	}

	public boolean isExpired(String token) {
		Claims claim = Jwts.parser().setSigningKey(SECRET_KEY.getBytes())
			.parseClaimsJws(token)
			.getBody();

		Date expiration = claim.getExpiration();
		return expiration.before(new Date());
	}

	public Long getClaimFromToken(String token, String name) {
		Claims claims = Jwts.parser()
			.setSigningKey(SECRET_KEY.getBytes())
			.parseClaimsJws(token)
			.getBody();

		return Long.parseLong((String)claims.get(name));
	}

	public Long getClaimFromExpirationToken(String expirationToken, String name) {

		try {
			Claims claims = Jwts.parser()
				.setSigningKey(SECRET_KEY.getBytes())
				.parseClaimsJws(expirationToken)
				.getBody();
			return Long.parseLong((String)claims.get(name));
		} catch (ExpiredJwtException e) {
			return Long.parseLong((String)e.getClaims().get(name));
		}
	}

	public String getAccessToken(HttpServletRequest request){
		String accessToken = request.getHeader("Authorization");
		accessToken = accessToken.replace("Bearer ", "");
		return accessToken;
	}
}
