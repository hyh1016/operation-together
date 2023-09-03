package com.yhproject.operation_together.service;

import jakarta.servlet.http.HttpSession;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.HashSet;
import java.util.Set;

@Service
public class AuthService {

    @Value("${auth.secret-key}")
    private String secretKey;

    private static final String SESSION_KEY = "operation-together-auth-key";
    private static final String ENCODING_ALGORITHM = "HmacSHA256";

    public void addAuthenticatedLink(String link) throws Exception {
        Set<String> allowedSet;
        if (getSession().getAttribute(SESSION_KEY) == null) {
             allowedSet = new HashSet<>();
        } else {
            allowedSet = getAuthenticatedLinkSet();
        }
        allowedSet.add(getEncodedLink(link));
        getSession().setAttribute(SESSION_KEY, allowedSet);
    }

    public boolean isAuthenticated(String link) throws Exception {
        String encodedLink = getEncodedLink(link);
        Set<String> allowedSet = getAuthenticatedLinkSet();
        return allowedSet.contains(encodedLink);
    }

    private Set<String> getAuthenticatedLinkSet() {
        return (Set<String>) getSession().getAttribute(SESSION_KEY);
    }

    private HttpSession getSession() {
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        return attr.getRequest().getSession(true);
    }

    private String getEncodedLink(String link) throws Exception {
        SecretKeySpec spec = new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), ENCODING_ALGORITHM);
        Mac mac = Mac.getInstance(ENCODING_ALGORITHM);
        mac.init(spec);
        byte[] hash = mac.doFinal(link.getBytes());
        return Base64.encodeBase64String(hash);
    }

}
