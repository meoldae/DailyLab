package com.amor4ti.dailylab.domain.hobby.repository;

import com.amor4ti.dailylab.domain.entity.Hobby;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface HobbyRepository extends JpaRepository<Hobby, Long> {
    Optional<Hobby> findByHobbyId(Long hobbyId);
    List<Hobby> findAllByCategory(String category);
}
