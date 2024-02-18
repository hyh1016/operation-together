package com.yhproject.operation_together;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.yhproject.operation_together.dto.input.CreateInputRequest;
import com.yhproject.operation_together.entity.Operation;
import com.yhproject.operation_together.repository.InputRepository;
import com.yhproject.operation_together.repository.OperationRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.UUID;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class InputIntegrationTests {

    @LocalServerPort
    private int port;

    @Autowired
    private MockMvc mvc;

    @Autowired
    private OperationRepository operationRepository;

    @Autowired
    private InputRepository inputRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private final String OPERATION_LINK = UUID.randomUUID().toString();

    @AfterEach
    public void tearDown() {
        operationRepository.deleteAll();
        inputRepository.deleteAll();
    }

    @DisplayName("작전에 새 입력 추가")
    @Nested
    class CreateInputTest {
        private final String CREATE_INPUT_URL = getApiUrl("");

        public ResultActions request(CreateInputRequest dto) throws Exception {
            return mvc.perform(post(CREATE_INPUT_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(dto)));
        }

        @DisplayName("성공")
        @Test
        @Transactional
        public void create_success() throws Exception {
            // given
            Operation operation = operationRepository.save(createOperation());
            CreateInputRequest dto = createDto();

            // when
            ResultActions resultActions = request(dto);

            // then
            resultActions.andExpect(status().isOk());
        }

        @DisplayName("없는 작전에 입력을 추가해 실패")
        @Test
        @Transactional
        public void create_fail() throws Exception {
            // given
            Operation operation = operationRepository.save(createOperation(UUID.randomUUID().toString()));
            CreateInputRequest dto = createDto();

            // when
            ResultActions resultActions = request(dto);

            // then
            resultActions.andExpect(status().is4xxClientError());
        }

        private CreateInputRequest createDto() {
            return CreateInputRequest.builder()
                    .name("tester")
                    .contents(Arrays.asList("A", "B", "C"))
                    .build();
        }

    }

    @DisplayName("작전 내 입력 목록 조회")
    @Nested
    class GetInputListTest {
        private final String GET_INPUT_LIST_URL = getApiUrl("");

        public ResultActions request(int page, int size) throws Exception {
            return mvc.perform(get(GET_INPUT_LIST_URL)
                    .param("page", String.valueOf(page))
                    .param("size", String.valueOf(size)));
        }

        @DisplayName("첫 페이지")
        @Test
        void getInputList_success_firstPage() {

        }

        @DisplayName("데이터가 하나도 없는 작전 조회하면 빈 리스트 제공")
        @Test
        void getInputList_success_empty() {

        }

        @DisplayName("없는 페이지를 조회해 실패")
        @Test
        void getInputList_fail_InvalidPage() {

        }

        @DisplayName("잘못된 페이지, 페이지 크기로 조회해 실패")
        @Test
        void getInputList_fail_InvalidRequestParameter() {

        }
    }

    @DisplayName("작전의 결과 문장 확인")
    @Nested
    class GetResultTest {
        private final String GET_RESULT_URL = getApiUrl("/result");

        public ResultActions request() throws Exception {
            return mvc.perform(get(GET_RESULT_URL));
        }

        @DisplayName("성공")
        @Test
        void getResult_success() {

        }

        @DisplayName("입력이 존재하지 않는 경우 실패")
        @Test
        void getResult_fail_emptyInputList() {

        }
    }

    private String getApiUrl(String path) {
        return "http://localhost:" + port + "/api/operations/" + OPERATION_LINK + "/inputs" + path;
    }

    private Operation createOperation() {
        return Operation.builder()
                .link(OPERATION_LINK)
                .name("tester")
                .password("1234")
                .operationDate(LocalDate.now())
                .build();
    }

    private Operation createOperation(String link) {
        return Operation.builder()
                .link(link)
                .name("tester")
                .password("1234")
                .operationDate(LocalDate.now())
                .build();
    }

}
