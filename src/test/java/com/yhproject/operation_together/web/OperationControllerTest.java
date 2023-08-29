package com.yhproject.operation_together.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.yhproject.operation_together.operation.dto.CreateOperationRequest;
import com.yhproject.operation_together.operation.entity.Operation;
import com.yhproject.operation_together.operation.entity.OperationRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class OperationControllerTest {

	@LocalServerPort
	private int port;

	@Autowired
	private OperationRepository operationRepository;

	@Autowired
	private MockMvc mvc;

	@AfterEach
	public void tearDown() {
		operationRepository.deleteAll();
	}

	@DisplayName("작전 생성 - 성공")
	@Test
	public void create_success() throws Exception {
		// given
		String name = "name";
		String password = "password";
		LocalDate operationDate = LocalDate.now();
		CreateOperationRequest dto = CreateOperationRequest.builder()
				.name(name)
				.password(password)
				.operationDate(operationDate)
				.build();

		String url = "http://localhost:" + port + "/api/operations";

		// when
		mvc.perform(post(url)
				.contentType(MediaType.APPLICATION_JSON)
				.content(new ObjectMapper().registerModule(new JavaTimeModule()).writeValueAsString(dto)))
				.andExpect(status().isOk());

		// then
		List<Operation> operationList = operationRepository.findAll();
		assertEquals(1, operationList.size());

		Operation operation = operationList.get(0);
		assertTrue(operation.getId() > 0);
		assertEquals(36, operation.getLink().length());
		assertEquals(dto.getName(), operation.getName());
		assertEquals(dto.getPassword(), operation.getPassword());
		assertEquals(dto.getOperationDate(), operation.getOperationDate());
	}

}
