package com.amor4ti.dailylab.domain.member.repository;

import com.amor4ti.dailylab.domain.entity.MemberStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface MemberStatusRepository extends JpaRepository<MemberStatus, Long> {
    Optional<MemberStatus> findFirstByMemberIdOrderByDateDesc(Long memberId);

    Optional<MemberStatus> findByMemberIdAndDate(Long memberId, LocalDate date);
}
