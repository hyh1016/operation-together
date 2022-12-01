package com.yhproject.operation_together.common.exception;

public enum ErrorCode {

    INVALID_LINK_ERROR("작전 링크가 존재하지 않습니다."),
    CREATE_LINK_ERROR("작전 생성에 실패하였습니다."),
    ;

    private final String message;

    ErrorCode(String message) {
        this.message = message;
    }

    public String getMessage() {
        return this.name() + ": " + message;
    }

    public String getMessage(Object value) {
        return this.name() + ": " + message + "\n" + "입력값: " + value;
    }

}
