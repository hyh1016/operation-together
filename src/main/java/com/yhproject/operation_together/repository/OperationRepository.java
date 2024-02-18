package com.yhproject.operation_together.repository;

import com.yhproject.operation_together.entity.Operation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OperationRepository extends JpaRepository<Operation, Long> {

    Optional<Operation> findByLink(String link);

}
