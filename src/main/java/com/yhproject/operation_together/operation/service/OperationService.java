package com.yhproject.operation_together.operation.service;

import com.yhproject.operation_together.common.dto.EmptyJSON;
import com.yhproject.operation_together.common.exception.NotFoundException;
import com.yhproject.operation_together.common.service.AuthService;
import com.yhproject.operation_together.operation.dto.CheckPasswordRequest;
import com.yhproject.operation_together.operation.dto.CreateOperationRequest;
import com.yhproject.operation_together.operation.dto.CreateOperationResponse;
import com.yhproject.operation_together.operation.dto.OperationDto;
import com.yhproject.operation_together.operation.entity.Operation;
import com.yhproject.operation_together.operation.entity.OperationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class OperationService {

    private final AuthService authService;
    private final OperationRepository operationRepository;

    @Transactional
    public CreateOperationResponse createOperation(CreateOperationRequest dto) {
        String newOperationLink = UUID.randomUUID().toString();
        dto.setLink(newOperationLink);
        operationRepository.save(dto.toEntity());
        return new CreateOperationResponse(newOperationLink);
    }

    @Transactional(readOnly = true)
    public OperationDto getOperation(String link) {
        Operation operation = findByLink(link);
        return OperationDto.toDto(operation);
    }

    @Transactional(readOnly = true)
    public EmptyJSON checkPassword(String link, CheckPasswordRequest dto) throws Exception {
        Operation operation = findByLink(link);
        String correctPassword = operation.getPassword();
        boolean isCorrect = Objects.equals(correctPassword, dto.getPassword());
        if (!isCorrect) {
            log.info("일치하지 않는 비밀번호가 입력되었습니다. link: {} | input password: {}", link, dto.getPassword());
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }
        authService.addAuthenticatedLink(link);
        return new EmptyJSON();
    }

    private Operation findByLink(String link) {
        return operationRepository.findByLink(link)
                .orElseThrow(() -> new NotFoundException("해당 작전을 찾을 수 없습니다. link: " + link));
    }

}
