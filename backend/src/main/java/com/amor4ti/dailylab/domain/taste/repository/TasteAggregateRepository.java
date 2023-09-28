package com.amor4ti.dailylab.domain.taste.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.amor4ti.dailylab.domain.entity.TasteAggregate;

@Repository
public interface TasteAggregateRepository extends JpaRepository<TasteAggregate, Long> {

	@Query(" SELECT ta"
		 + "   FROM TasteAggregate ta"
		 + "  WHERE ta.date = :date"
		 + "    AND ta.gender = :gender"
		 + "    AND ta.ageGroup = :ageGroup"
	)
	Optional<TasteAggregate> findByDateAndGenderAndAgeGroup(LocalDate date, String gender, String ageGroup);

	@Query(" SELECT ta"
		+ "   FROM TasteAggregate ta"
		+ "  WHERE ta.gender = :gender"
		+ "    AND ta.ageGroup = :ageGroup"
	    + "    AND ta.date BETWEEN :startDate AND :endDate")
	List findAllByGenderAndAgeGroupBetweenDate(String gender, String ageGroup, LocalDate startDate, LocalDate endDate);

	@Query(" SELECT ta"
		 + "   FROM TasteAggregate ta"
		 + "  WHERE ta.date BETWEEN :startDate AND :endDate")
	List findAllByBetweenDate(LocalDate startDate, LocalDate endDate);
}