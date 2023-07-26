package com.example.demo.service;


import org.springframework.http.ResponseEntity;


import com.example.demo.entities.User;

public interface UserService {
	public ResponseEntity<String> getMailOtpUser(String email);
	public ResponseEntity<String> verifyMailOtpUser(String userOtp);
	public ResponseEntity<String> signupUser (User user);
	public int loginUser(String email, String password);
	public ResponseEntity<String> logoutUser(User user);
	public ResponseEntity<String> forgotPasswordUser(String email);
	public ResponseEntity<String> resetPasswordUser(String resetToken, String newPassword);
	public User updateUser(User user);
	public User getProfile(Long id);
	
}
