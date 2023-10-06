package com.amor4ti.dailylab.domain.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Getter;

@Entity
@Getter
public class Taste {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String tasteName;
	private String description;
	private String imgSrc;
}
