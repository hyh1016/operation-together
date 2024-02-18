package com.yhproject.operation_together.repository;

import com.yhproject.operation_together.entity.Content;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContentRepository extends JpaRepository<Content, Long> {
}
