package com.yhproject.operation_together;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.yhproject.operation_together.dto.operation.CheckPasswordRequest;
import com.yhproject.operation_together.dto.operation.CreateOperationRequest;
import com.yhproject.operation_together.dto.operation.OperationDto;
import com.yhproject.operation_together.entity.Operation;
import com.yhproject.operation_together.repository.OperationRepository;
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
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class OperationIntegrationTests {

	@LocalServerPort
	private int port;

	@Autowired
	private OperationRepository operationRepository;

	@Autowired
	private MockMvc mvc;

	@Autowired
	private ObjectMapper objectMapper;

	private final int LINK_LENGTH = 36;

	@AfterEach
	public void tearDown() {
		operationRepository.deleteAll();
	}

	@DisplayName("작전 생성")
	@Nested
	class CreateOperationTest {
		private final String CREATE_OPERATION_URL = getApiUrl("/api/operations");

		public ResultActions request(CreateOperationRequest dto) throws Exception {
			return mvc.perform(post(CREATE_OPERATION_URL)
					.contentType(MediaType.APPLICATION_JSON)
					.content(objectMapper.writeValueAsString(dto)));
		}

		@DisplayName("작전 생성 성공")
		@Test
		public void create_success() throws Exception {
			// given
			CreateOperationRequest dto = createDto();

			// when
			ResultActions resultActions = request(dto);

			// then
			resultActions.andExpect(status().isOk());

			List<Operation> operationList = operationRepository.findAll();
			assertEquals(1, operationList.size());

			Operation operation = operationList.get(0);
			assertTrue(operation.getId() > 0);
			assertEquals(LINK_LENGTH, operation.getLink().length());
			assertEquals(dto.getName(), operation.getName());
			assertEquals(dto.getPassword(), operation.getPassword());
			assertEquals(dto.getOperationDate(), operation.getOperationDate());
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

			List<Operation> operationList = operationRepository.findAll();
			assertEquals(0, operationList.size());
		}
	}

	@DisplayName("작전 조회")
	@Nested
	class GetOperationTest {
		private final String GET_OPERATION_URL = getApiUrl("/api/operations");

		public ResultActions request(String link) throws Exception {
			return mvc.perform(get(GET_OPERATION_URL + "/" + link)
					.contentType(MediaType.APPLICATION_JSON));
		}

		@DisplayName("작전 조회 성공")
		@Test
		public void get_success() throws Exception {
			// given
			String link = UUID.randomUUID().toString();
			CreateOperationRequest dto = createDto();
			dto.setLink(link);
			operationRepository.save(dto.toEntity());

			// when
			ResultActions resultActions = request(link);

			// then
			resultActions.andExpect(status().isOk());

			OperationDto result = objectMapper.readValue(resultActions.andReturn().getResponse().getContentAsByteArray(), OperationDto.class);
			assertEquals(link, result.getLink());
		}

		@DisplayName("작전 조회 실패 - 없는 작전 조회")
		@Test
		public void get_fail_not_found() throws Exception {
			// given
			String link = UUID.randomUUID().toString();
			CreateOperationRequest dto = createDto();
			dto.setLink(link);
			operationRepository.save(dto.toEntity());

			// when
			String otherLink = UUID.randomUUID().toString();
			ResultActions resultActions = request(otherLink);

			// then
			resultActions.andExpect(status().isNotFound());
		}
	}

	@DisplayName("작전 비밀번호 확인")
	@Nested
	class CheckPassword {
		private final String CHECK_PASSWORD_URL = getApiUrl("/api/operations");

		public ResultActions request(String link, String password) throws Exception {
			CheckPasswordRequest dto = new CheckPasswordRequest(password);
			return mvc.perform(post(CHECK_PASSWORD_URL + "/" + link)
					.contentType(MediaType.APPLICATION_JSON)
					.content(objectMapper.writeValueAsString(dto)));
		}

		@DisplayName("작전 비밀번호 확인 성공 - 올바른 비밀번호 입력")
		@Test
		void checkPassword_success() throws Exception {
			// given
			String link = UUID.randomUUID().toString();
			CreateOperationRequest dto = createDto();
			dto.setLink(link);
			operationRepository.save(dto.toEntity());

			// when
			ResultActions resultActions = request(link, dto.getPassword());

			// then
			resultActions.andExpect(status().isOk());
		}

		@DisplayName("작전 비밀번호 확인 실패 - 올바르지 않은 비밀번호 입력")
		@Test
		void checkPassword_fail_wrongPassword() throws Exception {
			// given
			String link = UUID.randomUUID().toString();
			CreateOperationRequest dto = createDto();
			dto.setLink(link);
			operationRepository.save(dto.toEntity());

			// when
			ResultActions resultActions = request(link, "wrong password");

			// then
			resultActions.andExpect(status().isBadRequest());
		}
	}

	private String getApiUrl(String path) {
		return "http://localhost:" + port + path;
	}

	private CreateOperationRequest createDto() {
        return CreateOperationRequest.builder()
				.name("name")
				.password("password")
				.operationDate(LocalDate.now())
				.build();
	}

}
