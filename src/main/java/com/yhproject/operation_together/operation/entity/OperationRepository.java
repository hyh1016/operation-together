package com.yhproject.operation_together.operation.entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface OperationRepository extends JpaRepository<Operation, Long> {

    @Query("SELECT o FROM Operation o WHERE o.link=:link")
    public Optional<Operation> findByLink(String link);

    @Query("SELECT o FROM Operation o WHERE o.id=:id AND o.link=:link")
    public Optional<Operation> findByIdAndLink(Long id, String link);

}
