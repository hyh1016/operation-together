package com.yhproject.operation_together.common.config;

import com.yhproject.operation_together.common.exception.AuthenticateException;
import com.yhproject.operation_together.common.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@Aspect
@Component
public class AuthAspect {

    private final AuthService authService;

    /**
     * 권한 체크하는 Aspect
     * 해당 Aspect를 사용하는 메소드의 첫 번째 인자는 반드시 권한 체크를 위한 문자열 값이어야 함
     * @param joinPoint
     */
    @Before("@annotation(com.yhproject.operation_together.common.config.CheckAuth)")
    public void checkAuth(JoinPoint joinPoint) {
        try {
            Object[] args = joinPoint.getArgs();
            String link = (String) args[0];
            if (!authService.isAuthenticated(link)) {
                throw new AuthenticateException("작전에 대한 조회 권한이 없습니다. 작전 링크: " + link);
            }
        } catch (AuthenticateException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("세션 정보 조회 중 오류가 발생했습니다.", e);
        }
    }

}
