package com.yhproject.operation_together.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.yhproject.operation_together.operation.entity.Operation;
import com.yhproject.operation_together.operation.entity.OperationRepository;
import com.yhproject.operation_together.operation.dto.OperationSaveRequestDto;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class OperationControllerTest {

	@LocalServerPort
	private int port;

	@Autowired
	private OperationRepository operationRepository;

	@Autowired
	private MockMvc mvc;

	@AfterEach
	public void tearDown() throws Exception {
		operationRepository.deleteAll();
	}

	@Test
	public void createOperationTest() throws Exception {
		// given
		String name = "name";
		String password = "password";
		LocalDate operationDate = LocalDate.now();
		int type = 0;
		OperationSaveRequestDto dto = OperationSaveRequestDto.builder()
				.name(name)
				.password(password)
				.operationDate(operationDate)
				.type(type)
				.build();

		String url = "http://localhost:" + port + "/api/operations";

		// when
		mvc.perform(post(url)
				.contentType(MediaType.APPLICATION_JSON)
				.content(new ObjectMapper().registerModule(new JavaTimeModule()).writeValueAsString(dto)))
				.andExpect(status().isOk());

		// then
		List<Operation> all = operationRepository.findAll();
		assertThat(all.get(0).getLink().length()).isEqualTo(16);
	}

}
