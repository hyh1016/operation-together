package com.yhproject.operation_together.input.service;

import com.yhproject.operation_together.common.dto.EmptyJSON;
import com.yhproject.operation_together.input.dto.InputResponse;
import com.yhproject.operation_together.input.dto.InputResponse.InputResponseForm;
import com.yhproject.operation_together.input.dto.InputSaveRequest;
import com.yhproject.operation_together.input.dto.ResultResponse;
import com.yhproject.operation_together.input.dto.ResultResponse.ResultResponseForm;
import com.yhproject.operation_together.input.entity.Content;
import com.yhproject.operation_together.input.entity.ContentRepository;
import com.yhproject.operation_together.input.entity.Input;
import com.yhproject.operation_together.input.entity.InputRepository;
import com.yhproject.operation_together.operation.entity.Operation;
import com.yhproject.operation_together.operation.entity.OperationRepository;
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
    private final ContentRepository contentRepository;

    @Transactional
    public EmptyJSON createInput(String link, InputSaveRequest dto) {
        Operation operation = findOperationByLink(link);
        Input input = inputRepository.save(Input.builder()
                .name(dto.getName())
                .operation(operation)
                .build());
        List<Content> contentList = dto.getContents().stream()
                .map(content -> Content.builder()
                        .content(content)
                        .input(input)
                        .build())
                .collect(Collectors.toList());
        contentRepository.saveAll(contentList);
        return new EmptyJSON();
    }

    @Transactional(readOnly = true)
    public InputResponse getInputs(Long operationId, String link) {
        Operation operation = getAuthOperation(operationId, link);
        List<InputResponseForm> inputs = operation.getInputs()
                .stream()
                .map(this::transformEntityToDto)
                .collect(Collectors.toList());
        return new InputResponse(inputs);
    }

    @Transactional(readOnly = true)
    public ResultResponse getResponse(Long operationId, String link) {
        Operation operation = getAuthOperation(operationId, link);
        List<Input> inputs = operation.getInputs();
        if (inputs.isEmpty()) return new ResultResponse(null);
        int length = inputs.size();
        List<ResultResponseForm> result = new ArrayList<>();
        for (int i = 0; i < 3; i++) {
            Input input = inputs.get((int) (Math.random() * length));
            result.add(ResultResponseForm.builder()
                    .name(input.getName())
                    .content(input.getContents().get(i).getContent())
                    .build()
            );
        }
        return new ResultResponse(result);
    }

    private Operation findOperationByLink(String link) {
        return operationRepository.findByLink(link)
                .orElseThrow(() -> new IllegalArgumentException("해당 작전을 찾을 수 없습니다. link: " + link));
    }

    private Operation getAuthOperation(long id, String link) {
        return operationRepository.findByIdAndLink(id, link)
                .orElseThrow(() -> new IllegalArgumentException("해당 작전을 찾을 수 없습니다. id: " + id + ", link: " + link));
    }

    private InputResponseForm transformEntityToDto(Input input) {
        return InputResponseForm.builder()
                .id(input.getId())
                .name(input.getName())
                .contents(input.getContents().stream().map(Content::getContent).collect(Collectors.toList()))
                .build();
    }
}
