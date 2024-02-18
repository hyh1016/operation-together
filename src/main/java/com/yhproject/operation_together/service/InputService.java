package com.yhproject.operation_together.service;

import com.yhproject.operation_together.dto.InputListResponse;
import com.yhproject.operation_together.dto.input.ContentDto;
import com.yhproject.operation_together.dto.input.CreateInputRequest;
import com.yhproject.operation_together.dto.input.InputDto;
import com.yhproject.operation_together.dto.input.ResultResponse;
import com.yhproject.operation_together.dto.operation.OperationDto;
import com.yhproject.operation_together.entity.Content;
import com.yhproject.operation_together.entity.Input;
import com.yhproject.operation_together.repository.ContentRepository;
import com.yhproject.operation_together.repository.InputRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InputService {
    private final OperationService operationService;
    private final InputRepository inputRepository;
    private final ContentRepository contentRepository;

    @Transactional
    public InputDto createInput(String link, CreateInputRequest dto) {
        OperationDto operation = operationService.getOperation(link);
        Input input = inputRepository.save(Input.builder()
                .name(dto.getName())
                .operation(operation.toEntity())
                .build());
        List<Content> contentList = contentRepository.saveAll(dto.getContents().stream()
                .map(content -> Content.builder()
                        .content(content)
                        .input(input)
                        .build())
                .collect(Collectors.toList()));
        InputDto inputDto = InputDto.toDto(input);
        List<ContentDto> contentDtoList = contentList.stream().map(ContentDto::toDto).toList();
        inputDto.setContents(contentDtoList);
        return inputDto;
    }

    @Transactional(readOnly = true)
    public InputListResponse getInputList(String link, int page, int pageSize) {
        OperationDto operation = operationService.getOperation(link);
        Page<Input> inputPage = inputRepository.findAllByOperationId(operation.getId(), PageRequest.of(page, pageSize));
        return InputListResponse.getInstance(inputPage);
    }

    @Transactional(readOnly = true)
    public List<ResultResponse> getResultList(String link) {
        OperationDto operation = operationService.getOperation(link);
        // 전체 조회 시 메모리에 부하가 일어날 수 있으므로 id만 조회해 랜덤 선정하고 해당 id의 엔티티를 조회
        List<Long> inputIdList = inputRepository.findAllIdByOperationId(operation.getId());
        if (inputIdList.isEmpty()) {
            return new ArrayList<>();
        }
        List<Long> selectedIdList = new ArrayList<>();
        for (int i = 0; i < 3; i++) {
            selectedIdList.add(inputIdList.get((int) (Math.random() * inputIdList.size())));
        }
        List<Input> inputList = inputRepository.findAllByIdIn(new HashSet<>(selectedIdList));
        Map<Long, Input> inputMap = inputList.stream().collect(Collectors.toMap(Input::getId, input -> input));
        List<ResultResponse> resultResponseList = new ArrayList<>();
        for (int i = 0; i < selectedIdList.size(); i++) {
            Input input = inputMap.get(selectedIdList.get(i));
            resultResponseList.add(ResultResponse.builder()
                    .name(input.getName())
                    .content(input.getContents().get(i).getContent())
                    .build());
        }
        return resultResponseList;
    }

    private Input findById(Long id) {
        return inputRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당하는 Input을 찾을 수 없습니다. id: " + id));
    }

}
