package com.amor4ti.dailylab.global.util;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

public class CustomAuthorityMapper implements GrantedAuthoritiesMapper {

	private String prefix = "ROLE_";

	@Override
	public Set<GrantedAuthority> mapAuthorities(Collection<? extends GrantedAuthority> authorities) {

		HashSet<GrantedAuthority> mapped = new HashSet<>(authorities.size());
		for (GrantedAuthority authority : authorities) {
			mapped.add(mapAuthority(authority.getAuthority()));
		}

		return mapped;
	}

	private GrantedAuthority mapAuthority(String name) {
		// Google은 name이 http://~~~~/.../email 로 반환됨
		// 앞의 긴 문장을 다 떼어내기 위함
		if(name.lastIndexOf(".") > 0){
			int index = name.lastIndexOf(".");
			name = "SCOPE_" + name.substring(index+1);
		}
		if (this.prefix.length() > 0 && !name.startsWith(this.prefix)) {
			name = this.prefix + name;
		}
		return new SimpleGrantedAuthority(name);
	}
}
