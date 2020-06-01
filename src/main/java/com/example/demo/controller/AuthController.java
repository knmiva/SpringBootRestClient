package com.example.demo.controller;

import com.example.demo.dto.AuthenticationRequestDto;
import com.example.demo.dto.DtoResponseUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public class AuthController {
    private final String restServerLogin;
    private final String startingWord;

    @Autowired
    public AuthController(@Value("http://localhost:8080/rest/auth/login") String restServerLogin,
                          @Value("Bearer_") String startingWord) throws HttpClientErrorException, HttpServerErrorException {
        this.restServerLogin = restServerLogin;
        this.startingWord = startingWord;
    }

    @GetMapping("/")
    public String Login() {
        return "login";
    }

    @PostMapping("/login")
    public String getToken(AuthenticationRequestDto authenticationRequestDto, HttpServletRequest req) {
        HttpHeaders httpHeaders = new HttpHeaders();

        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<AuthenticationRequestDto> userHttpEntity = new HttpEntity<>(authenticationRequestDto, httpHeaders);
        HttpSession httpSession = req.getSession();
        System.out.println("go");
        try {
            System.out.println("try");
            ResponseEntity<DtoResponseUser> result = restTemplate.exchange(
                    restServerLogin,
                    HttpMethod.POST,
                    userHttpEntity,
                    DtoResponseUser.class);
            DtoResponseUser userDtoFromBody = result.getBody();
            String tokenCode = userDtoFromBody.getToken();
            userDtoFromBody.setToken(startingWord + tokenCode);
            httpSession.setAttribute("username", userDtoFromBody.getUsername());
            httpSession.setAttribute("token", userDtoFromBody.getToken());
            System.out.println("token " + userDtoFromBody.getToken());
            httpSession.setAttribute("roles", userDtoFromBody.getRoles());
            if (userDtoFromBody.getRoles().contains("ROLE_ADMIN")) {
                return "redirect:/admin";
            } else {
                return "redirect:/user";
            }
        } catch (HttpClientErrorException httpClientErrorException) {
            System.out.println("ОШИБКА АВТОРИЗАЦИИ!!!");
            return "error403";
        } catch (HttpServerErrorException httpServerErrorException) {
            System.out.println("ОШИБКА НА СЕРВЕРЕ !!!");
            return "error";
        }
    }
}











