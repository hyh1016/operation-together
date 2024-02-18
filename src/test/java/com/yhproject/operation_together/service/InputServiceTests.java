package com.yhproject.operation_together.service;

import com.yhproject.operation_together.dto.InputListResponse;
import com.yhproject.operation_together.dto.input.CreateInputRequest;
import com.yhproject.operation_together.dto.input.InputDto;
import com.yhproject.operation_together.dto.input.ResultResponse;
import com.yhproject.operation_together.dto.operation.OperationDto;
import com.yhproject.operation_together.entity.Content;
import com.yhproject.operation_together.entity.Input;
import com.yhproject.operation_together.repository.ContentRepository;
import com.yhproject.operation_together.repository.InputRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.LongStream;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
public class InputServiceTests {

    @InjectMocks
    private InputService inputService;

    @Mock
    private OperationService operationService;

    @Mock
    private InputRepository inputRepository;

    @Mock
    private ContentRepository contentRepository;

    @DisplayName("입력 생성 - 성공")
    @Test
    void createInput_success() {
        // given
        CreateInputRequest createInputRequest = CreateInputRequest.builder()
                .name("tester")
                .contents(Arrays.asList(
                        "A에서",
                        "B와",
                        "C를 한다."
                )).build();
        given(inputRepository.save(any(Input.class)))
                .willAnswer(invocation -> {
                    Input input = (Input) invocation.getArgument(0);
                    return Input.builder()
                            .id(1L)
                            .name(input.getName())
                            .contents(input.getContents())
                            .operation(input.getOperation())
                            .build();
                });
        given(operationService.getOperation(anyString()))
                .willAnswer(invocation -> OperationDto.builder()
                        .id(1L)
                        .name("name")
                        .link(invocation.getArgument(0))
                        .operationDate(LocalDate.now())
                        .build());
        given(contentRepository.saveAll(anyCollection()))
                .willAnswer(invocation -> invocation.getArgument(0));

        // when
        InputDto input = inputService.createInput(UUID.randomUUID().toString(), createInputRequest);

        // then
        assertTrue(input.getId() > 0);
        assertEquals("tester", input.getName());
        assertEquals(3, input.getContents().size());
        for (int i = 0; i < input.getContents().size(); i++) {
            assertEquals(createInputRequest.getContents().get(i), input.getContents().get(i).getContent());
        }
    }

    @DisplayName("입력 생성 - 실패 (없는 작전)")
    @Test
    void createInput_fail_invalidOperationLink() {
        // given
        CreateInputRequest createInputRequest = CreateInputRequest.builder()
                .name("tester")
                .contents(Arrays.asList(
                        "A에서",
                        "B와",
                        "C를 한다."
                )).build();
        given(operationService.getOperation(anyString()))
                .willThrow(new IllegalArgumentException());

        // when, then
        assertThrows(IllegalArgumentException.class, () -> inputService.createInput(UUID.randomUUID().toString(), createInputRequest));
    }

    @DisplayName("입력 조회 - 성공")
    @Test
    void getInputList_success() {
        // given
        given(operationService.getOperation(anyString()))
                .willAnswer(invocation -> OperationDto.builder()
                        .id(1L)
                        .name("name")
                        .link(invocation.getArgument(0))
                        .operationDate(LocalDate.now())
                        .build());
        List<Input> inputList = Arrays.asList(
                Input.builder().id(1L).build(),
                Input.builder().id(2L).build(),
                Input.builder().id(3L).build()
        );
        int pageSize = 2;
        int total = Math.floorDiv(inputList.size(), pageSize) + 1;
        given(inputRepository.findAllByOperationId(anyLong(), any(Pageable.class)))
                .willAnswer(invocation -> new PageImpl<>(inputList.subList(0, pageSize), invocation.getArgument(1), total));
        int currentPage = 1;

        // when
        InputListResponse result = inputService.getInputList(UUID.randomUUID().toString(), currentPage, pageSize);

        // then
        assertEquals(currentPage, result.getCurrentPage());
        assertEquals(total, result.getTotalPages());
        assertEquals(pageSize, result.getInputList().size());
        for (int i = 0; i < result.getInputList().size(); i++) {
            assertEquals(inputList.get(i).getId(), result.getInputList().get(i).toEntity().getId());
        }
    }

    @DisplayName("작전 결과 조회 (id 개수가 1, 2, 5개일 때) - 성공")
    @ParameterizedTest
    @ValueSource(ints = {1, 2, 5})
    void getResultList_success(int idCount) {
        // given
        given(operationService.getOperation(anyString()))
                .willAnswer(invocation -> OperationDto.builder()
                        .id(1L)
                        .name("name")
                        .link(invocation.getArgument(0))
                        .operationDate(LocalDate.now())
                        .build());
        List<Long> idList = LongStream.range(1, idCount + 1).boxed().toList();
        List<String> nameList = idList.stream().map(id -> "name" + id).toList();
        given(inputRepository.findAllIdByOperationId(anyLong()))
                .willReturn(idList);
        given(inputRepository.findAllByIdIn(anySet()))
                .willAnswer(invocation -> {
                    Set<Long> list = invocation.getArgument(0);
                    return list.stream().map(id -> Input.builder()
                                    .id(id)
                                    .name("name" + id)
                                    .contents(Arrays.asList(
                                            Content.builder().content("A").build(),
                                            Content.builder().content("B").build(),
                                            Content.builder().content("C").build()
                                    ))
                                    .build())
                            .toList();
                });

        // when
        List<ResultResponse> resultList = inputService.getResultList(UUID.randomUUID().toString());

        // then
        // 모든 엔티티가 idList 내에서 선정되었음
        assertEquals(3, resultList.size());
        for (ResultResponse response : resultList) {
            assertTrue(nameList.contains(response.getName()));
        }
    }

    @DisplayName("작전 결과 조회 - 실패 (작전에 등록된 입력이 하나도 없음)")
    @Test
    void getResultList_fail_emptyInputList() {
        // given
        given(operationService.getOperation(anyString()))
                .willAnswer(invocation -> OperationDto.builder()
                        .id(1L)
                        .name("name")
                        .link(invocation.getArgument(0))
                        .operationDate(LocalDate.now())
                        .build());
        given(inputRepository.findAllIdByOperationId(anyLong()))
                .willReturn(List.of());

        // when, then
        assertThrows(IllegalStateException.class, () -> inputService.getResultList(UUID.randomUUID().toString()));
    }

}
