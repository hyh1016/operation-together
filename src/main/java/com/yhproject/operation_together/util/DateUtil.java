package com.yhproject.operation_together.util;

import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DateUtil {

    public String getKoDate(LocalDate date) {
        String[] strings = date.toString().split("-");
        return strings[0] + "년 " + strings[1] + "월 " + strings[2] + "일";
    }

}
