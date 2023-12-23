package com.yhproject.operation_together.repository;

import com.yhproject.operation_together.entity.Input;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InputRepository extends JpaRepository<Input, Long> {

    Page<Input> findAllByOperationId(Long operationId, Pageable pageable);

    @Query("select id from Input where operation.id = :operationId")
    List<Long> findAllIdByOperationId(Long operationId);

    List<Input> findAllByIdIn(List<Long> idList);

}
