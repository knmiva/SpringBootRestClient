package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public class AppController {

    @RequestMapping("/admin")
    public String adminPage (HttpServletRequest req) {
        HttpSession httpSession = req.getSession(false);
        try {
            String roles = (String) httpSession.getAttribute("roles");
            if (roles.contains("ROLE_ADMIN")) {
                return "admin";
            } else {
                return "error";
            }
        } catch (Exception e) {
            return "error";
        }
    }

    @GetMapping("/user")
    public String userPage(HttpServletRequest req) {
        HttpSession httpSession = req.getSession();
        try {
            String roles = (String) httpSession.getAttribute("roles");
            if (roles.contains("ROLE_USER")) {
                return "user";
            } else {
                return "error";
            }
        } catch (Exception e) {
            return "error";
        }
    }

    @GetMapping("/error")
    public ModelAndView error(ModelAndView modelAndView) {
        modelAndView.setViewName("error");
        return modelAndView;
    }

    @PostMapping("/logout")
    public String logout(HttpServletRequest req) {
        HttpSession httpSession = req.getSession();
        httpSession.removeAttribute("username");
        httpSession.removeAttribute("token");
        httpSession.removeAttribute("roles");
        return "login";
    }
}

