package com.yhproject.operation_together.input.service;

import com.yhproject.operation_together.common.dto.EmptyJSON;
import com.yhproject.operation_together.input.dto.CreateInputRequest;
import com.yhproject.operation_together.input.dto.InputDto;
import com.yhproject.operation_together.input.dto.ResultResponse;
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
    public EmptyJSON createInput(String link, CreateInputRequest dto) {
        Operation operation = findOperationByLink(link);
        Input input = Input.builder()
                .name(dto.getName())
                .operation(operation)
                .build();
        inputRepository.save(input);
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
    public List<InputDto> getInputList(String link) {
        Operation operation = findOperationByLink(link);
        return operation.getInputs()
                .stream()
                .map(InputDto::toDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ResultResponse> getResultList(String link) {
        Operation operation = findOperationByLink(link);
        List<Input> inputs = operation.getInputs();
        List<ResultResponse> resultList = new ArrayList<>();
        if (inputs.isEmpty()) return resultList;
        int length = inputs.size();
        for (int i = 0; i < 3; i++) {
            Input input = inputs.get((int) (Math.random() * length));
            resultList.add(ResultResponse.builder()
                    .name(input.getName())
                    .content(input.getContents().get(i).getContent())
                    .build()
            );
        }
        return resultList;
    }

    private Operation findOperationByLink(String link) {
        return operationRepository.findByLink(link)
                .orElseThrow(() -> new IllegalArgumentException("해당 작전을 찾을 수 없습니다. link: " + link));
    }

}
