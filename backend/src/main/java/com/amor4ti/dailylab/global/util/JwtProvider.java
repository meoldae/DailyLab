package com.amor4ti.dailylab.global.util;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

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

	//AccessToken 생성
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

	//RefreshToken 생성
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

	//AccessToken 검증
	public boolean validateToken(String token) {
		try {
			Jwts.parser().setSigningKey(SECRET_KEY.getBytes()).parseClaimsJws(token);
			return true;
		} catch (MalformedJwtException e) { // 유효하지 않은 JWT
			//            throw new CustomException(TOKEN_INVALID);
			throw new MalformedJwtException("not valid jwt");
		} catch (ExpiredJwtException e) { // 만료된 JWT
			//            throw new CustomException(REFRESH_TOKEN_RENEWAL);
			throw new ExpiredJwtException(null, null, "expired");
		} catch (UnsupportedJwtException e) { // 지원하지 않는 JWT
			//            throw new CustomException(TOKEN_UNSUPPORTED);
			throw new UnsupportedJwtException("unsupported jwt");
		} catch (IllegalArgumentException e) { // 빈값
			//            throw new CustomException(TOKEN_NOT_FOUND);
			throw new IllegalArgumentException("empty jwt");
		}
	}

	// AccessToken 만료 여부 체크
	public boolean isExpired(String token) {
		Claims claim = Jwts.parser().setSigningKey(SECRET_KEY.getBytes())
			.parseClaimsJws(token)
			.getBody();

		Date expiration = claim.getExpiration();
		return expiration.before(new Date());
	}

	public String getProviderFromToken(String token) {
		Claims claims = Jwts.parser()
			.setSigningKey(SECRET_KEY.getBytes())
			.parseClaimsJws(token)
			.getBody();

		return (String)claims.get("provider");
	}

	public String getAccessToken(HttpServletRequest request){
		String accessToken = request.getHeader("Authorization");
		accessToken = accessToken.replace("Bearer ", "");
		return accessToken;
	}
}
