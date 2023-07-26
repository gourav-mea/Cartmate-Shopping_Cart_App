package com.example.demo.service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.dao.UserDao;
import com.example.demo.entities.User;

@Service
public class UserServiceImpl implements UserService {
	public String otpString;
	@Autowired
	private UserDao userDao;
	
	@Autowired
    private EmailService emailService;
	
	List<User> list;
	public UserServiceImpl() {
		// TODO Auto-generated constructor stub
	}
	
//	login Function
	@Override
	public int loginUser(String email, String password) {
	    User user = userDao.findByEmail(email);
	    if (user != null && (user.getPassword()).equals(password)) {
	    	user.setLogin("true");
	    	userDao.save(user);
	        return user.getUserId();
	    } else {
	        return -1;
	    }
	}
	
//	get Mail OTP function
	@Override
	public ResponseEntity<String> getMailOtpUser(String email) {
		User user = userDao.findByEmail(email);
		if(user!=null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"Error\":\"Account with this mail already exists\"}");
		}
		this.otpString = String.format("%04d", new Random().nextInt(9999));
		emailService.sendOtpEmail(email, otpString);
        return ResponseEntity.ok("{\"otp mail\":\"sent\"}");
	}
	
//	verify mail otp function
	public ResponseEntity<String> verifyMailOtpUser(String userOtp) {
		if(otpString.equals(userOtp)) {
			otpString="";
			return ResponseEntity.ok("{\"E-Mail\":\"Verified\"}");
		}		
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"Error\":\"Invalid OTP\"}"); 
	}
	
//	Sign up Function
	@Override
	public ResponseEntity<String> signupUser(User user) {
		userDao.save(user);
		return ResponseEntity.ok("{\"userId\":" + user.getUserId() + "}");
	}

//  logout Function 
	@Override
	public ResponseEntity<String> logoutUser(User user) {
		// TODO Auto-generated method stub
		if (user == null) {
        	return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"Cannot Logout\":\"User Not Found\"}");
        }
		user.setLogin("false");
		userDao.save(user);
		return ResponseEntity.ok("{\"Logout Successfully userId\":" + user.getUserId() + "}");
	}

//	Forgot Password Method
	@Override
	public ResponseEntity<String> forgotPasswordUser(String email) {
		User user = userDao.findByEmail(email);
        if (user == null) {
        	return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"Cannot send mail\":\"User Not Found\"}");
        }

        String resetToken = String.format("%06d", new Random().nextInt(999999));
        user.setResetTokenString(resetToken);
        userDao.save(user);
        
        emailService.sendPasswordResetEmail(user.getEmail(), resetToken);
        return ResponseEntity.ok("{\"mail\":\"sent\"}");
	}
	
//	Reset password function
	@Override
	public ResponseEntity<String> resetPasswordUser(String resetToken, String newPassword) {
		User user = userDao.findByresetTokenString(resetToken);
		if(user==null) {
			return ResponseEntity.badRequest().body("Invalid token");
		}
		else if(user.getResetTokenString().equals(resetToken)) {
			user.setPassword(newPassword);
			user.setResetTokenString(null);
			userDao.save(user);
			return ResponseEntity.ok("{\"Message\":\"New Password set successfully\"}");
		}
		return ResponseEntity.ok("{\"Message\":\"Token didnt match, password not set\"}");
	}

//	update User
	@Override
	public User updateUser(User user) {
		User updateUser = userDao.findByEmail(user.getEmail());
		if(updateUser.getPassword().equals(updateUser.getPassword())) {
			updateUser = userDao.save(user);
		}
		else {
			return null;
		}
		updateUser.setPassword("");
		return updateUser;
	}

//	get Profile by id
	public User getProfile(Long id) {
	    Optional<User> optionalUser = userDao.findById(id.intValue());
	    return optionalUser.orElse(null);
	}



	

}
