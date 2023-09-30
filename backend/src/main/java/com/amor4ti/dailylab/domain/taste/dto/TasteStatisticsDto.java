package com.amor4ti.dailylab.domain.taste.dto;

import lombok.Getter;

@Getter
public class TasteStatisticsDto {
	private int sweet;
	private int sour;
	private int salty;
	private int spicy;
	private int bitter;
	private String mostTaste;
	private String imgSrc;

	public TasteStatisticsDto(int[] major, String mostTaste, String imgSrc){
		this.sweet = major[0];
		this.sour = major[1];
		this.salty = major[2];
		this.spicy = major[3];
		this.bitter = major[4];
		this.mostTaste = mostTaste;
		this.imgSrc = imgSrc;
	}
}
