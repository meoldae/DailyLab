package com.amor4ti.dailylab.domain.taste.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.amor4ti.dailylab.domain.entity.Taste;
import com.amor4ti.dailylab.domain.taste.dto.TasteSummaryDto;

public interface TasteRepository extends JpaRepository<Taste, Long> {

	@Query(" SELECT new com.amor4ti.dailylab.domain.taste.dto.TasteSummaryDto("
		 + " t.tasteName, t.description, t.imgSrc) "
		 + "   FROM Taste t"
		 + "  WHERE t.id =:tasteId ")
	Optional<TasteSummaryDto> findById(int tasteId);

}
