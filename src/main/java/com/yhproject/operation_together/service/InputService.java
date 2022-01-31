package com.yhproject.operation_together.service;

import com.yhproject.operation_together.domain.input.Input;
import com.yhproject.operation_together.domain.input.InputRepository;
import com.yhproject.operation_together.domain.operation.Operation;
import com.yhproject.operation_together.domain.operation.OperationRepository;
import com.yhproject.operation_together.web.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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

    @Transactional(readOnly = true)
    public InputResponseDto getInputs(Long operationId, String link) {
        Operation operation = getAuthOperation(operationId, link);
        List<InputResponseForm> inputs = operation.getInputs()
                .stream()
                .map(this::transformEntityToDto)
                .collect(Collectors.toList());
        return new InputResponseDto(inputs);
    }

    private Operation getAuthOperation(Long operationId, String link) {
        return operationRepository.findByIdAAndLink(operationId, link)
                .orElseThrow(() -> new IllegalArgumentException("해당 작전이 없습니다."));
    }

    private InputResponseForm transformEntityToDto(Input input) {
        return InputResponseForm.builder()
                .id(input.getId())
                .name(input.getName())
                .contents(input.getContents())
                .build();
    }

    @Transactional(readOnly = true)
    public ResultDto getResponse(Long operationId, String link) {
        Operation operation = getAuthOperation(operationId, link);
        List<Input> inputs = operation.getInputs();
        int length = operation.getInputs().size();
        List<ResultForm> result = new ArrayList<>();
        for (int i = 0; i < 3; i++) {
            Input input = inputs.get((int) (Math.random() * length));
            result.add(ResultForm.builder()
                    .name(input.getName())
                    .content(input.getContents().get(i))
                    .build()
            );
        }
        return new ResultDto(result);
    }
}
