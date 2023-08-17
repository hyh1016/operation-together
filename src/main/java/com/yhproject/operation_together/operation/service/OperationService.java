package com.yhproject.operation_together.operation.service;

import com.yhproject.operation_together.common.auth.jwt.JwtTokenProvider;
import com.yhproject.operation_together.common.exception.ErrorCode;
import com.yhproject.operation_together.common.exception.InternalServerException;
import com.yhproject.operation_together.common.exception.NotFoundException;
import com.yhproject.operation_together.operation.dto.*;
import com.yhproject.operation_together.operation.entity.Operation;
import com.yhproject.operation_together.operation.entity.OperationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.sql.Timestamp;
import java.util.Base64;
import java.util.Objects;

@RequiredArgsConstructor
@Service
public class OperationService {

    private final OperationRepository operationRepository;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public OperationSaveResponseDto createOperation(OperationSaveRequestDto dto) {
        String newOperationLink = createLink();
        dto.setLink(newOperationLink);
        try {
            operationRepository.save(dto.toEntity());
            return new OperationSaveResponseDto(newOperationLink);
        } catch (Exception e) {
            throw new InternalServerException(ErrorCode.CREATE_LINK_ERROR.getMessage(newOperationLink));
        }
    }

    private String createLink() {
        // 난수 링크 생성
        String candidate = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        StringBuilder link = new StringBuilder();
        link.append(new Timestamp(System.currentTimeMillis()));
        for (int j = 0; j < 6; j++) {
            int index = (int) (Math.random() * candidate.length());
            link.append(candidate.charAt(index));
        }
        byte[] encode = Base64.getEncoder().encode(link.toString().getBytes(StandardCharsets.UTF_8));
        return new String(encode);
    }

    public OperationResponseDto getOperation(String link) {
        Operation operation = operationRepository.findByLink(link)
                .orElseThrow(() -> new NotFoundException(ErrorCode.INVALID_LINK_ERROR.getMessage(link)));
        return OperationResponseDto.builder()
                .id(operation.getId())
                .name(operation.getName())
                .link(operation.getLink())
                .operationDate(operation.getOperationDate())
                .build();
    }

    public PasswordResponseDto checkPassword(String link, PasswordRequestDto dto) {
        Operation operation = operationRepository.findByLink(link)
                .orElseThrow(() -> new NotFoundException(ErrorCode.INVALID_LINK_ERROR.getMessage(link)));
        String correctPassword = operation.getPassword();
        boolean isCorrect = Objects.equals(correctPassword, dto.getPassword());
        if (isCorrect) {
            String jwtToken = jwtTokenProvider.createJwtToken(operation.getId());
            return new PasswordResponseDto(jwtToken);
        }
        return new PasswordResponseDto(null);
    }

}
