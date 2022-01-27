package com.yhproject.operation_together.service;

import com.yhproject.operation_together.domain.input.Input;
import com.yhproject.operation_together.domain.input.InputRepository;
import com.yhproject.operation_together.domain.operation.Operation;
import com.yhproject.operation_together.domain.operation.OperationRepository;
import com.yhproject.operation_together.web.dto.EmptyJSON;
import com.yhproject.operation_together.web.dto.InputForm;
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
    public void createInput(String link, InputForm dto) {
        Operation operation = operationRepository.findByLink(link)
                .orElseThrow(() -> new IllegalArgumentException("해당 작전이 없습니다."));
        inputRepository.save(Input.builder()
                .name(dto.getName())
                .position(dto.getPosition())
                .content(dto.getContent())
                .operation(operation)
                .build());
    }

    @Transactional
    public EmptyJSON createInputAll(String link, InputSaveRequestDto dtos) {
        for (InputForm dto : dtos.getInputs()) {
            createInput(link, dto);
        }
        return new EmptyJSON();
    }

}
