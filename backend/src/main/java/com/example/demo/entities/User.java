package com.example.demo.entities;


import java.util.List;
import java.util.ArrayList;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int userId;
	private String name;
	private String email;
	private String phoneNo;
	private String password;
	private String resetTokenString;
	public String otpEmailString;
	public String isLogin;
	
	public String isLogin() {
		return isLogin;
	}

	public void setLogin(String isLogin) {
		this.isLogin = isLogin;
	}

	@OneToMany( mappedBy = "user", cascade = CascadeType.ALL)
	@JsonIgnoreProperties("user")
	private List<Address> addresses;
	
	@OneToMany(mappedBy = "user")
	@JsonIgnoreProperties("user")
	private List<CartItem> cartItems;
	
	@OneToMany(mappedBy = "user")
	@JsonIgnoreProperties("user")
	private List<Order> orders;
	
	public User(int userId, String name, String email, String phoneNo, String password) {
		super();
		this.userId = userId;
		this.name = name;
		this.email = email;
		this.phoneNo = phoneNo;
		this.password = password;
		this.addresses = new ArrayList<>();
		this.cartItems = new ArrayList<>();
		this.orders = new ArrayList<>();
		this.isLogin = "false";
	}

	public List<CartItem> getCartItems() {
		return cartItems;
	}

	public void setCartItems(List<CartItem> cartItems) {
		this.cartItems = cartItems;
	}

	public User() {
		super();
		this.isLogin = "false";
		// TODO Auto-generated constructor stub
	}

	public User(int userId) {
		// TODO Auto-generated constructor stub
		super();
		this.isLogin = "false";
		this.userId=userId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhoneNo() {
		return phoneNo;
	}

	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	
	@Override
	public String toString() {
		return "User [userId=" + userId + ", name=" + name + ", email=" + email + ", phoneNo=" + phoneNo + ", password="
				+ password + ", resetTokenString=" + resetTokenString + ", otpEmailString=" + otpEmailString
				+ ", isLogin=" + isLogin + ", addresses=" + addresses + ", cartItems=" + cartItems + ", orders="
				+ orders + "]";
	}

	public String getResetTokenString() {
		return resetTokenString;
	}

	public void setResetTokenString(String resetTokenString) {
		this.resetTokenString = resetTokenString;
	}

	public String getOtpEmailString() {
		return otpEmailString;
	}

	public void setOtpEmailString(String otpEmailString) {
		this.otpEmailString = otpEmailString;
	}

	public List<Address> getAddresses() {
		return addresses;
	}

	public void setAddresses(List<Address> addresses) {
		this.addresses = addresses;
	}

	public List<Order> getOrders() {
		return orders;
	}

	public void setOrders(List<Order> orders) {
		this.orders = orders;
	}
	
	
}
