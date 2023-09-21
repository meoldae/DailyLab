package com.amor4ti.dailylab.domain.member.repository;

import com.amor4ti.dailylab.domain.entity.Mbti;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MbtiRepository extends JpaRepository<Mbti, Long> {
    Optional<Mbti> findMbtiByTypeAAndTypeBAndTypeCAndTypeD(int typeA, int typeB, int typeC, int typeD);
}
