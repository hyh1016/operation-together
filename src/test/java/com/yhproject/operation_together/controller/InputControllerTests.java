package com.yhproject.operation_together.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.yhproject.operation_together.common.config.AuthAspect;
import com.yhproject.operation_together.dto.InputListResponse;
import com.yhproject.operation_together.dto.input.CreateInputRequest;
import com.yhproject.operation_together.dto.input.InputDto;
import com.yhproject.operation_together.dto.input.ResultResponse;
import com.yhproject.operation_together.service.AuthService;
import com.yhproject.operation_together.service.InputService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.aop.AopAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(InputController.class)
@Import({AopAutoConfiguration.class, AuthAspect.class})
public class InputControllerTests {

    @MockBean
    private InputService inputService;

    @MockBean
    private AuthService authService;

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;

    @DisplayName("작전 입력 생성 테스트")
    @Nested
    class CreateInputTest {
        private final String link = UUID.randomUUID().toString();
        private final String CREATE_INPUT_URL = "/api/operations/" + link + "/inputs";

        public ResultActions request(CreateInputRequest dto) throws Exception {
            return mvc.perform(post(CREATE_INPUT_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(dto)));
        }

        @DisplayName("작전 입력 생성 성공")
        @Test
        public void create_success() throws Exception {
            // given
            CreateInputRequest dto = getInputRequest();
            given(inputService.createInput(anyString(), any(CreateInputRequest.class)))
                    .willReturn(new InputDto());

            // when
            ResultActions resultActions = request(dto);

            // then
            resultActions.andExpect(status().isOk());
        }

        @DisplayName("작전 입력 생성 실패 - 요청 데이터 검증 오류")
        @Test
        public void create_fail_not_found() throws Exception {
            // given
            CreateInputRequest dto = new CreateInputRequest();

            // when
            ResultActions resultActions = request(dto);

            // then
            resultActions.andExpect(status().isBadRequest());
        }
    }

    @DisplayName("작전 입력 리스트 조회")
    @Nested
    class GetInputList {
        private final String link = UUID.randomUUID().toString();
        private final String GET_INPUT_LIST_URL = "/api/operations/" + link + "/inputs";

        public ResultActions request() throws Exception {
            return mvc.perform(get(GET_INPUT_LIST_URL)
                    .contentType(MediaType.APPLICATION_JSON));
        }

        @DisplayName("작전 입력 리스트 조회 성공")
        @Test
        public void get_success() throws Exception {
            // given
            given(authService.isAuthenticated(anyString()))
                    .willReturn(true);
            List<InputDto> inputDtoList = Arrays.asList(
                    getInputDto(1L),
                    getInputDto(2L)
            );
            given(inputService.getInputList(anyString(), anyInt(), anyInt()))
                    .willReturn(new InputListResponse(1, 0, inputDtoList));

            // when
            ResultActions resultActions = request();

            // then
            resultActions.andExpect(status().isOk())
                    .andExpect(jsonPath("$.inputList").isArray())
                    .andExpect(jsonPath("$.inputList", hasSize(2)));
        }

        @DisplayName("작전 입력 리스트 조회 실패 - 권한 없음")
        @Test
        public void get_fail_not_found() throws Exception {
            // given
            given(authService.isAuthenticated(anyString()))
                    .willReturn(false);

            // when
            ResultActions resultActions = request();

            // then
            resultActions.andExpect(status().isForbidden());
        }
    }

    @DisplayName("작전 결과 조회")
    @Nested
    class GetResultTest {
        private final String link = UUID.randomUUID().toString();
        private final String GET_RESULT_URL = "/api/operations/" + link + "/inputs/result";

        public ResultActions request() throws Exception {
            return mvc.perform(get(GET_RESULT_URL)
                    .contentType(MediaType.APPLICATION_JSON));
        }

        @DisplayName("작전 결과 조회 성공")
        @Test
        void getResult_success() throws Exception {
            // given
            given(authService.isAuthenticated(anyString()))
                    .willReturn(true);
            List<ResultResponse> resultResponseList = Arrays.asList(
                    getResultResponse(),
                    getResultResponse()
            );
            given(inputService.getResultList(anyString()))
                    .willReturn(resultResponseList);

            // when
            ResultActions resultActions = request();

            // then
            resultActions.andExpect(status().isOk());
        }

        @DisplayName("작전 결과 조회 실패 - 권한 없음")
        @Test
        void getResult_fail_not_found() throws Exception {
            // given
            given(authService.isAuthenticated(anyString()))
                    .willReturn(false);

            // when
            ResultActions resultActions = request();

            // then
            resultActions.andExpect(status().isForbidden());
        }
    }

    private InputDto getInputDto(long id) {
        return InputDto.builder()
                .id(id)
                .build();
    }

    private ResultResponse getResultResponse() {
        return ResultResponse.builder()
                .name("name")
                .content("content")
                .build();
    }

    private CreateInputRequest getInputRequest() {
        return CreateInputRequest.builder()
                .name("name")
                .contents(Arrays.asList(
                        "A와",
                        "B에서",
                        "C를 한다."
                ))
                .build();
    }

}
