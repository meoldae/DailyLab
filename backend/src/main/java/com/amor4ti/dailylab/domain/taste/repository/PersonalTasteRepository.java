package com.amor4ti.dailylab.domain.taste.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.amor4ti.dailylab.domain.entity.PersonalTasteAggregate;

@Repository
public interface PersonalTasteRepository extends JpaRepository<PersonalTasteAggregate, Long> {

	@Query(" SELECT new com.amor4ti.dailylab.domain.entity.TasteAggregate("
		 + "pta.taste0, pta.taste1, pta.taste2, pta.taste3, pta.taste4, pta.taste5, pta.taste6, pta.taste7, pta.taste8,"
		 + "pta.taste9, pta.taste10, pta.taste11, pta.taste12, pta.taste13, pta.taste14, pta.date)"
		 + "   FROM PersonalTasteAggregate pta"
		 + "  WHERE pta.memberId = :memberId"
		 + "    AND pta.date BETWEEN :startDate AND :endDate")
	List findAllByIdAndBetweenDate(Long memberId, LocalDate startDate, LocalDate endDate);

	@Query(" ")
	Optional<PersonalTasteAggregate> findbyIdAndDate(Long memberId, LocalDate today);
}
