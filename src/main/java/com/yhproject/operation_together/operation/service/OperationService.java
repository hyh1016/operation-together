package com.yhproject.operation_together.operation.service;

import com.yhproject.operation_together.common.auth.jwt.JwtTokenProvider;
import com.yhproject.operation_together.operation.dto.*;
import com.yhproject.operation_together.operation.entity.Operation;
import com.yhproject.operation_together.operation.entity.OperationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class OperationService {

    private final OperationRepository operationRepository;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public CreateOperationResponse createOperation(CreateOperationRequest dto) {
        String newOperationLink = UUID.randomUUID().toString();
        dto.setLink(newOperationLink);
        operationRepository.save(dto.toEntity());
        return new CreateOperationResponse(newOperationLink);
    }

    @Transactional(readOnly = true)
    public OperationResponse getOperation(String link) {
        Operation operation = findByLink(link);
        return OperationResponse.builder()
                .id(operation.getId())
                .name(operation.getName())
                .link(operation.getLink())
                .operationDate(operation.getOperationDate())
                .build();
    }

    @Transactional(readOnly = true)
    public CheckPasswordResponse checkPassword(String link, CheckPasswordRequest dto) {
        Operation operation = findByLink(link);
        String correctPassword = operation.getPassword();
        boolean isCorrect = Objects.equals(correctPassword, dto.getPassword());
        if (isCorrect) {
            String jwtToken = jwtTokenProvider.createJwtToken(operation.getId());
            return new CheckPasswordResponse(jwtToken);
        }
        return new CheckPasswordResponse(null);
    }

    private Operation findByLink(String link) {
        return operationRepository.findByLink(link)
                .orElseThrow(() -> new IllegalArgumentException("해당 작전을 찾을 수 없습니다. link: " + link));
    }

}
