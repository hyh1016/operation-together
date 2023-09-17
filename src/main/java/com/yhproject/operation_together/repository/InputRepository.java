package com.yhproject.operation_together.repository;

import com.yhproject.operation_together.entity.Input;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InputRepository extends JpaRepository<Input, Long> {

    Page<Input> findAllByOperationId(Long operationId, Pageable pageable);

}
