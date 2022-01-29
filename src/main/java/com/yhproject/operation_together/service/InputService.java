package com.yhproject.operation_together.service;

import com.yhproject.operation_together.domain.input.Input;
import com.yhproject.operation_together.domain.input.InputRepository;
import com.yhproject.operation_together.domain.operation.Operation;
import com.yhproject.operation_together.domain.operation.OperationRepository;
import com.yhproject.operation_together.web.dto.EmptyJSON;
import com.yhproject.operation_together.web.dto.InputSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class InputService {

    private final OperationRepository operationRepository;
    private final InputRepository inputRepository;

    @Transactional
    public EmptyJSON createInput(String link, InputSaveRequestDto dto) {
        Operation operation = operationRepository.findByLink(link)
                .orElseThrow(() -> new IllegalArgumentException("해당 작전이 없습니다."));
        inputRepository.save(Input.builder()
                .name(dto.getName())
                .contents(dto.getContents())
                .operation(operation)
                .build());
        return new EmptyJSON();
    }

}
