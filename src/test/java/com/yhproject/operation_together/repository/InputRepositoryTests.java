package com.yhproject.operation_together.repository;

import com.yhproject.operation_together.entity.Input;
import com.yhproject.operation_together.entity.Operation;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
public class InputRepositoryTests {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private InputRepository inputRepository;

    @Test
    void findAllByOperationIdTest() {
        // given
        Operation operation = entityManager.merge(Operation.builder()
                .link(UUID.randomUUID().toString())
                .name("tester")
                .password("1234")
                .operationDate(LocalDate.now())
                .build());
        int ENTITY_COUNT = 10;
        List<Input> inputList = new ArrayList<>();
        for (int i = 0; i < ENTITY_COUNT; i++) {
            inputList.add(entityManager.merge(Input.builder()
                    .name("name" + i)
                    .operation(operation)
                    .build()));
        }
        int PAGE_SIZE = 3;
        int totalPage = Math.floorDiv(ENTITY_COUNT, PAGE_SIZE) + Math.floorMod(ENTITY_COUNT, PAGE_SIZE);

        // when
        Page<Input> inputPage = inputRepository.findAllByOperationId(operation.getId(), PageRequest.of(0, PAGE_SIZE));

        // then
        assertEquals(totalPage, inputPage.getTotalPages());
        assertEquals(PAGE_SIZE, inputPage.getContent().size());
        for (int i = 0; i < inputPage.getContent().size(); i++) {
            assertEquals(inputList.get(i), inputPage.getContent().get(i));
        }
    }

    @Test
    void findAllIdByOperationIdTest() {
        // given
        Operation operation = entityManager.merge(Operation.builder()
                .link(UUID.randomUUID().toString())
                .name("tester")
                .password("1234")
                .operationDate(LocalDate.now())
                .build());
        int ENTITY_COUNT = 3;
        List<Input> inputList = new ArrayList<>();
        for (int i = 0; i < ENTITY_COUNT; i++) {
            inputList.add(entityManager.merge(Input.builder()
                    .name("name" + i)
                    .operation(operation)
                    .build()));
        }

        // when
        List<Long> idList = inputRepository.findAllIdByOperationId(operation.getId());

        // then
        assertEquals(inputList.size(), idList.size());
        assertArrayEquals(inputList.stream().map(Input::getId).toArray(), idList.toArray());
    }

    @Test
    void findAllByIdInTest() {
        // given
        Operation operation = entityManager.merge(Operation.builder()
                .link(UUID.randomUUID().toString())
                .name("tester")
                .password("1234")
                .operationDate(LocalDate.now())
                .build());
        int ENTITY_COUNT = 3;
        List<Long> idList = new ArrayList<>();
        for (int i = 0; i < ENTITY_COUNT; i++) {
            idList.add(entityManager.merge(Input.builder()
                            .name("name" + i)
                            .operation(operation)
                            .build())
                    .getId());
        }

        // when
        List<Input> inputList = inputRepository.findAllByIdIn(idList);

        // then
        assertEquals(idList.size(), inputList.size());
        for (int i = 0; i < inputList.size(); i++) {
            assertEquals(idList.get(i), inputList.get(i).getId());
        }
    }

}
