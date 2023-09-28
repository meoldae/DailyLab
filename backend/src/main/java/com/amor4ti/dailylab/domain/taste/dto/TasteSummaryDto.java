package com.amor4ti.dailylab.domain.taste.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TasteSummaryDto {

	private String tasteName;
	private String description;
	private String imgSrc;

}
