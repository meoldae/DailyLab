package com.amor4ti.dailylab.domain.member.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import com.amor4ti.dailylab.domain.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.amor4ti.dailylab.domain.entity.Member;
import com.amor4ti.dailylab.domain.member.dto.MainMemberDto;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long>,
		  								  MemberCustomRepository,
									      QuerydslPredicateExecutor<Todo> {

	Optional<Member> findByEmailAndProvider(String email, String provider);

    @Query("SELECT new com.amor4ti.dailylab.domain.member.dto.MainMemberDto(" +
            "m.username, m.gender, m.birthday, m.mbtiId, m.job, m.goal, m.religion) " +
            " FROM Member m " +
            " WHERE m.memberId = :memberId")
    Optional<MainMemberDto> findMainMemberDtoByMemberId(Long memberId);

    @Query("SELECT m FROM Member m WHERE m.memberId = :memberId")
    Optional<Member> findMemberByMemberId(@Param("memberId") Long memberId);

	@Query("SELECT new com.amor4ti.dailylab.domain.member.dto.MemberSimilarityDto("
		 + " m.memberId, m.gender, m.birthday, mbti.typeA, mbti.typeB, mbti.typeC, mbti.typeD, m.job, m.religion  )"
		 + "  FROM Member m"
		 + "  JOIN Mbti mbti ON m.mbtiId = mbti.mbtiId "
		 + " WHERE m.exitDate IS NULL "
		 + "   AND m.birthday IS NOT NULL ")
	List findAllMemberSimilarityDto();

	@Query("SELECT new com.amor4ti.dailylab.domain.member.dto.MemberStatusForCalendarDto(ms.date, ms.status) "
		+ "  FROM MemberStatus ms "
		+ " WHERE ms.memberId = :memberId "
		+ "   AND ms.date BETWEEN :startDay AND :endDay"
		+ " ORDER BY ms.date ASC ")
	List findAllStatusByRangeAndMemberId(Long memberId, LocalDate startDay, LocalDate endDay);
}
