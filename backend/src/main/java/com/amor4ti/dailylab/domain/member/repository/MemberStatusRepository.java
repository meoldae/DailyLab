package com.amor4ti.dailylab.domain.member.repository;

import com.amor4ti.dailylab.domain.entity.MemberStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface MemberStatusRepository extends JpaRepository<MemberStatus, Long> {
    Optional<MemberStatus> findFirstByMemberIdOrderByDateDesc(Long memberId);

    Optional<MemberStatus> findByMemberIdAndDate(Long memberId, LocalDate date);

    @Query(" SELECT ms.memberId "
         + "   FROM MemberStatus ms "
         + "  WHERE ms.date = :date"
         + "    AND ms.status = :status")
    List findMemberIdListByDateAndStatus(LocalDate date, String status);
}
