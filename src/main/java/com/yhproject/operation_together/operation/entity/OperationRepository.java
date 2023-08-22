package com.yhproject.operation_together.operation.entity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OperationRepository extends JpaRepository<Operation, Long> {

    Optional<Operation> findByLink(String link);

    Optional<Operation> findByIdAndLink(Long operationId, String link);
}
