package com.yhproject.operation_together.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.yhproject.operation_together.common.dto.EmptyJSON;
import com.yhproject.operation_together.common.exception.NotFoundException;
import com.yhproject.operation_together.operation.controller.OperationController;
import com.yhproject.operation_together.operation.dto.CheckPasswordRequest;
import com.yhproject.operation_together.operation.dto.CreateOperationRequest;
import com.yhproject.operation_together.operation.dto.CreateOperationResponse;
import com.yhproject.operation_together.operation.dto.OperationDto;
import com.yhproject.operation_together.operation.service.OperationService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.time.LocalDate;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(OperationController.class)
public class OperationControllerTests {

    @MockBean
    private OperationService operationService;

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;

    @DisplayName("작전 생성 테스트")
    @Nested
    class CreateOperationTest {
        private final String CREATE_OPERATION_URL = "/api/operations";

        public ResultActions request(CreateOperationRequest dto) throws Exception {
            return mvc.perform(post(CREATE_OPERATION_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(dto)));
        }

        @DisplayName("작전 생성 성공")
        @Test
        public void create_success() throws Exception {
            // given
            CreateOperationRequest dto = getCreateOperationRequest();
            given(operationService.createOperation(any(CreateOperationRequest.class)))
                    .willReturn(new CreateOperationResponse(dto.getLink()));

            // when
            ResultActions resultActions = request(dto);

            // then
            resultActions.andExpect(status().isOk())
                    .andExpect(jsonPath("$.link").value(dto.getLink()));
        }

        @DisplayName("작전 생성 실패 - 요청 데이터 검증 오류")
        @Test
        public void create_fail_validation() throws Exception {
            // given
            CreateOperationRequest dto = new CreateOperationRequest();

            // when
            ResultActions resultActions = request(dto);

            // then
            resultActions.andExpect(status().isBadRequest());
        }
    }

    @DisplayName("작전 조회")
    @Nested
    class GetOperationTest {
        private final String GET_OPERATION_URL = "/api/operations";

        public ResultActions request(String link) throws Exception {
            return mvc.perform(get(GET_OPERATION_URL + "/" + link)
                    .contentType(MediaType.APPLICATION_JSON));
        }

        @DisplayName("작전 조회 성공")
        @Test
        public void get_success() throws Exception {
            // given
            String link = UUID.randomUUID().toString();
            given(operationService.getOperation(anyString()))
                    .willAnswer(invocation -> {
                        String inputLink = invocation.getArgument(0);
                        return getOperationDto(inputLink);
                    });

            // when
            ResultActions resultActions = request(link);

            // then
            resultActions.andExpect(status().isOk())
                    .andExpect(jsonPath("$.link").value(link));
        }

        @DisplayName("작전 조회 실패 - 없는 작전 조회")
        @Test
        public void get_fail_not_found() throws Exception {
            // given
            String link = UUID.randomUUID().toString();
            given(operationService.getOperation(anyString()))
                    .willThrow(new NotFoundException("해당 작전을 찾을 수 없습니다. link: " + link));

            // when
            ResultActions resultActions = request(link);

            // then
            resultActions.andExpect(status().isNotFound());
        }
    }

    @DisplayName("작전 비밀번호 확인")
    @Nested
    class CheckPassword {
        private final String link = UUID.randomUUID().toString();
        private final String CHECK_PASSWORD_URL = "/api/operations/" + link;

        public ResultActions request(String password) throws Exception {
            CheckPasswordRequest dto = new CheckPasswordRequest(password);
            return mvc.perform(post(CHECK_PASSWORD_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(dto)));
        }

        @DisplayName("작전 비밀번호 확인 성공 - 올바른 비밀번호 입력")
        @Test
        void checkPassword_success() throws Exception {
            // given
            given(operationService.checkPassword(anyString(), any(CheckPasswordRequest.class)))
                    .willReturn(new EmptyJSON());

            // when
            ResultActions resultActions = request("password");

            // then
            resultActions.andExpect(status().isOk());
        }

        @DisplayName("작전 비밀번호 확인 실패 - 올바르지 않은 비밀번호 입력")
        @Test
        void checkPassword_fail_wrongPassword() throws Exception {
            // given
            given(operationService.checkPassword(anyString(), any(CheckPasswordRequest.class)))
                    .willThrow(new IllegalArgumentException("비밀번호가 일치하지 않습니다."));

            // when
            ResultActions resultActions = request("wrong password");

            // then
            resultActions.andExpect(status().isBadRequest());
        }
    }

    private CreateOperationRequest getCreateOperationRequest() {
        return CreateOperationRequest.builder()
                .name("name")
                .password("password")
                .operationDate(LocalDate.now())
                .build();
    }

    private static OperationDto getOperationDto(String link) {
        return OperationDto.builder()
                .id(1L)
                .name("name")
                .link(link)
                .operationDate(LocalDate.now())
                .build();
    }

}
