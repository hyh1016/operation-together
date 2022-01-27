package com.yhproject.operation_together.service;

import com.yhproject.operation_together.auth.jwt.JwtTokenProvider;
import com.yhproject.operation_together.domain.operation.Operation;
import com.yhproject.operation_together.domain.operation.OperationRepository;
import com.yhproject.operation_together.util.DateUtil;
import com.yhproject.operation_together.web.dto.*;
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
    private final DateUtil dateUtil;

    @Transactional
    public OperationSaveResponseDto createOperation(OperationSaveRequestDto dto) {
        dto.setLink(createLink());
        String newOperationLink = operationRepository.save(dto.toEntity()).getLink();
        return OperationSaveResponseDto.builder().link(newOperationLink).build();
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
        Operation operation = operationRepository.findByLink(link).orElseThrow(() -> new IllegalArgumentException("해당 작전이 없습니다."));
        return OperationResponseDto.builder()
                .id(operation.getId())
                .name(operation.getName())
                .link(operation.getLink())
                .operationKoDate(dateUtil.getKoDate(operation.getOperationDate()))
                .build();
    }

    public OperationResponseDto getOperation(Long id) {
        Operation operation = operationRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 작전이 없습니다."));
        return OperationResponseDto.builder()
                .id(operation.getId())
                .name(operation.getName())
                .link(operation.getLink())
                .operationKoDate(dateUtil.getKoDate(operation.getOperationDate()))
                .build();
    }

    public PasswordResponseDto checkPassword(String link, PasswordRequestDto dto) {
        Operation operation = operationRepository.findByLink(link).orElseThrow(() -> new IllegalArgumentException("해당 작전이 없습니다."));
        String correctPassword = operation.getPassword();
        boolean isCorrect = Objects.equals(correctPassword, dto.getPassword());
        if (isCorrect) {
            String jwtToken = jwtTokenProvider.createJwtToken(operation.getId());
            return new PasswordResponseDto(jwtToken);
        }
        return new PasswordResponseDto(null);
    }

}
