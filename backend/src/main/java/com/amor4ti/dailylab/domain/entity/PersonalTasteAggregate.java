package com.amor4ti.dailylab.domain.entity;

import java.lang.reflect.Field;
import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PersonalTasteAggregate {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private Long memberId;
	private LocalDate date;
	private int taste0;
	private int taste1;
	private int taste2;
	private int taste3;
	private int taste4;
	private int taste5;
	private int taste6;
	private int taste7;
	private int taste8;
	private int taste9;
	private int taste10;
	private int taste11;
	private int taste12;
	private int taste13;
	private int taste14;
	private String typeA;
	private String typeB;
	private String typeC;
	private String typeD;

	public int[] getTasteAggregateList(){
		return new int[]{this.taste0, this.taste1, this.taste2, this.taste3, this.taste4, this.taste5, this.taste6, this.taste7,
			this.taste8, this.taste9, this.taste10, this.taste11, this.taste12, this.taste13, this.taste14};
	}

	public void setTasteValue(int index, int value) {
		try {
			Field field = this.getClass().getDeclaredField("taste" + index);
			field.setAccessible(true);
			field.setInt(this, value);
		} catch (NoSuchFieldException | IllegalAccessException e) {
			e.printStackTrace();
		}
	}

	public int getTasteValue(int index) {
		try {
			Field field = this.getClass().getDeclaredField("taste" + index);
			field.setAccessible(true);
			return field.getInt(this); // 필드의 값을 반환
		} catch (NoSuchFieldException | IllegalAccessException e) {
			return 0;
		}
	}

	public void setDate(LocalDate date){
		this.date = date;
	}

	public void setMemberId(Long memberId) {
		this.memberId = memberId;
	}
}
