package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.mail.SimpleMailMessage;


@Service
public class EmailService {
    @Autowired
    private JavaMailSender javaMailSender;

    public void sendPasswordResetEmail(String toEmail, String resetToken) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Password Reset");
        message.setText("The token to reset your password is:\n\n" + resetToken);
        javaMailSender.send(message);
    }
    public void sendOtpEmail(String toEmail, String otpString) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Welcome to CartMate");
        message.setText("The otp to Sign up your account with us is:\n\n" + otpString);
        javaMailSender.send(message);
    }
}
