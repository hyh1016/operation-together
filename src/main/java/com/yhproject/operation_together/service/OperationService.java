package com.yhproject.operation_together.service;

import com.yhproject.operation_together.domain.operation.Operation;
import com.yhproject.operation_together.domain.operation.OperationRepository;
import com.yhproject.operation_together.web.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Objects;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class OperationService {

    private final OperationRepository operationRepository;

    @Transactional
    public OperationSaveResponseDto createOperation(OperationSaveRequestDto dto) {
        dto.setLink(createLink());
        String newOperationLink = operationRepository.save(dto.toEntity()).getLink();
        return OperationSaveResponseDto.builder().link(newOperationLink).build();
    }

    public OperationResponseDto getOperation(String link) {
        Operation operation = operationRepository.findByLink(link).orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다."));
        return OperationResponseDto.builder()
                .id(operation.getId())
                .name(operation.getName())
                .link(operation.getLink())
                .operationKoDate(getKoDate(operation.getOperationDate()))
                .type(operation.getType())
                .build();
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

    private String getKoDate(LocalDate date) {
        String[] strings = date.toString().split("-");
        return strings[0] + "년 " + strings[1] + "월 " + strings[2] + "일";
    }
}
