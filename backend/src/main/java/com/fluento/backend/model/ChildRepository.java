package com.fluento.backend.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChildRepository extends JpaRepository<Child, Long> {
    Optional<Child> findByName(String name);
    java.util.List<Child> findAllByOrderByTotalXpDesc();
}
