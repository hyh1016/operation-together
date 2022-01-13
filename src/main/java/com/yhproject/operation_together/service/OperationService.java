package com.yhproject.operation_together.service;

import com.yhproject.operation_together.domain.operation.Operation;
import com.yhproject.operation_together.domain.operation.OperationRepository;
import com.yhproject.operation_together.web.dto.OperationSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class OperationService {

    private final OperationRepository operationRepository;

    @Transactional
    public String createOperation(OperationSaveRequestDto dto) {
        dto.setLink(createLink());
        return operationRepository.save(dto.toEntity()).getLink();
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
            Optional<Operation> operaion = operationRepository.findByLink(link.toString());
            if (operaion.isPresent()) {
                link = new StringBuilder();
                continue;
            }
            return link.toString();
        }
    }

}
