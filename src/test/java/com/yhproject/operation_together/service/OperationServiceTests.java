package com.yhproject.operation_together.service;

import com.yhproject.operation_together.common.exception.NotFoundException;
import com.yhproject.operation_together.dto.operation.CheckPasswordRequest;
import com.yhproject.operation_together.dto.operation.CreateOperationRequest;
import com.yhproject.operation_together.dto.operation.CreateOperationResponse;
import com.yhproject.operation_together.dto.operation.OperationDto;
import com.yhproject.operation_together.entity.Operation;
import com.yhproject.operation_together.repository.OperationRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;

@ExtendWith(MockitoExtension.class)
public class OperationServiceTests {

    @InjectMocks
    OperationService operationService;

    @Mock
    AuthService authService;

    @Mock
    OperationRepository operationRepository;

    @DisplayName("작전 생성 - 성공")
    @Test
    void createOperation_success() {
        // given
        CreateOperationRequest request = CreateOperationRequest.builder()
                .name("name")
                .password("1234")
                .operationDate(LocalDate.now())
                .build();
        given(operationRepository.save(any(Operation.class)))
                .willReturn(request.toEntity());

        // when
        CreateOperationResponse result = operationService.createOperation(request);

        // then
        assertEquals(36, result.getLink().length());
    }

    @DisplayName("작전 조회 - 성공")
    @Test
    void getOperation_success() {
        // given
        String link = UUID.randomUUID().toString();
        Operation operation = Operation.builder()
                .id(1L)
                .name("name")
                .password("password")
                .link(link)
                .operationDate(LocalDate.now())
                .build();
        given(operationRepository.findByLink(anyString()))
                .willReturn(Optional.of(operation));

        // when
        OperationDto result = operationService.getOperation(link);

        // then
        assertEquals(operation.getId(), result.getId());
        assertEquals(operation.getLink(), result.getLink());
        assertEquals(operation.getName(), result.getName());
        assertEquals(operation.getOperationDate(), result.getOperationDate());
    }

    @DisplayName("작전 조회 - 실패 - 없는 작전 조회")
    @Test
    void getOperation_fail_notFound() {
        // given
        String link = UUID.randomUUID().toString();
        given(operationRepository.findByLink(anyString()))
                .willReturn(Optional.empty());

        // when, then
        assertThrows(NotFoundException.class, () -> operationService.getOperation(link));
    }

    @DisplayName("작전 비밀번호 인증 - 성공")
    @Test
    void checkPassword_success() throws Exception {
        // given
        String link = UUID.randomUUID().toString();
        String password = "1234";
        CheckPasswordRequest request = new CheckPasswordRequest(password);
        Operation operation = Operation.builder()
                .id(1L)
                .name("name")
                .password(password)
                .link(link)
                .operationDate(LocalDate.now())
                .build();
        given(operationRepository.findByLink(anyString()))
                .willReturn(Optional.of(operation));
        doNothing().when(authService).addAuthenticatedLink(anyString());

        // when, then
        assertDoesNotThrow(() -> operationService.checkPassword(link, request));
    }

}
