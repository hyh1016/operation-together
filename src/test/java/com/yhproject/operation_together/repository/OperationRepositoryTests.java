package com.yhproject.operation_together.repository;

import com.yhproject.operation_together.entity.Operation;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDate;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@DataJpaTest
public class OperationRepositoryTests {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private OperationRepository operationRepository;

    @Test
    void findByLinkTest() {
        // given
        String link = UUID.randomUUID().toString();
        entityManager.merge(Operation.builder()
                .link(link)
                .name("tester")
                .password("1234")
                .operationDate(LocalDate.now())
                .build());

        // when
        Operation operation = operationRepository.findByLink(link).orElseThrow();

        // then
        assertTrue(operation.getId() > 0);
        assertEquals(link, operation.getLink());
    }

}
