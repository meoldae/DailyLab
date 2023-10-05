package com.amor4ti.dailylab.domain.hobby.repository;

import com.amor4ti.dailylab.domain.entity.Hobby;
import com.amor4ti.dailylab.domain.entity.MemberHobby;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MemberHobbyRepository extends JpaRepository<MemberHobby, Long> {

    @Query("SELECT mh.hobby FROM MemberHobby mh WHERE mh.member.memberId = :memberId")
    List<Hobby> findHobbyListByMemberId(Long memberId);

    Optional<MemberHobby> findMemberHobbyByMember_MemberIdAndHobby_HobbyId(Long memberId, Long hobbyId);

	@Query("SELECT mh.hobby.hobbyId FROM MemberHobby mh WHERE mh.member.memberId = :memberId")
	List<Integer> findHobbyIdByMemberId(Long memberId);
}
