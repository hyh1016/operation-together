package com.yhproject.operation_together.operation;

import com.yhproject.operation_together.common.auth.jwt.JwtTokenProvider;
import com.yhproject.operation_together.common.exception.NotFoundException;
import com.yhproject.operation_together.operation.dto.*;
import com.yhproject.operation_together.operation.entity.Operation;
import com.yhproject.operation_together.operation.entity.OperationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class OperationService {

    private final OperationRepository operationRepository;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public OperationSaveResponseDto createOperation(OperationSaveRequestDto dto) {
        dto.setLink(createLink());
        String newOperationLink = operationRepository.save(dto.toEntity()).getLink();
        return new OperationSaveResponseDto(newOperationLink);
    }

    private String createLink() {
        // 난수 링크 생성
        String candidate = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder link = new StringBuilder();
        while (true) {
            for (int i = 0; i < 16; i++) {
                int index = (int) (Math.random() * candidate.length());
                link.append(candidate.charAt(index));
            }
            Optional<Operation> operation = operationRepository.findByLink(link.toString());
            if (operation.isPresent()) {
                link = new StringBuilder();
                continue;
            }
            return link.toString();
        }
    }

    public OperationResponseDto getOperation(String link) {
        Operation operation = operationRepository.findByLink(link).orElseThrow(() -> new NotFoundException("해당 작전이 없습니다."));
        return OperationResponseDto.builder()
                .id(operation.getId())
                .name(operation.getName())
                .link(operation.getLink())
                .operationDate(operation.getOperationDate())
                .build();
    }

    public PasswordResponseDto checkPassword(String link, PasswordRequestDto dto) {
        Operation operation = operationRepository.findByLink(link).orElseThrow(() -> new NotFoundException("해당 작전이 없습니다."));
        String correctPassword = operation.getPassword();
        boolean isCorrect = Objects.equals(correctPassword, dto.getPassword());
        if (isCorrect) {
            String jwtToken = jwtTokenProvider.createJwtToken(operation.getId());
            return new PasswordResponseDto(jwtToken);
        }
        return new PasswordResponseDto(null);
    }

}
