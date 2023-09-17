package com.yhproject.operation_together.dto;

import com.yhproject.operation_together.dto.input.InputDto;
import com.yhproject.operation_together.entity.Input;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class InputListResponse {

    int totalPages;
    int currentPage;
    List<InputDto> inputList;

    public static InputListResponse getInstance(Page<Input> page) {
        int totalPages = page.getTotalPages();
        int currentPage = page.getNumber();
        List<InputDto> inputList = page.getContent().stream().map(InputDto::toDto).collect(Collectors.toList());
        return new InputListResponse(totalPages, currentPage, inputList);
    }

}
