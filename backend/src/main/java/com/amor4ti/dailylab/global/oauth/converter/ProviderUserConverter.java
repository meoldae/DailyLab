package com.amor4ti.dailylab.global.oauth.converter;

public interface ProviderUserConverter<T, R> {

	R convert(T t);

}