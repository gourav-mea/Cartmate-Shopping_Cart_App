package com.example.demo.entities;

public class Login {
	private String emailLogin;
	private String passwordLogin;	
	private String utilityString;
	
	public String getpasswordLogin() {
		return passwordLogin;
	}
	public void setpasswordLogin(String passwordLogin) {
		this.passwordLogin = passwordLogin;
	}
	@Override
	public String toString() {
		return "Login [emailLogin=" + emailLogin + ", passwordLogin=" + passwordLogin + "]";
	}
	public Login() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Login(String emailLogin, String passwordLogin) {
		super();
		this.emailLogin = emailLogin;
		this.passwordLogin = passwordLogin;
	}
	public String getemailLogin() {
		return emailLogin;
	}
	public void setemailLogin(String emailLogin) {
		this.emailLogin = emailLogin;
	}
	public String getUtilityString() {
		return utilityString;
	}
	public void setUtilityString(String utilityString) {
		this.utilityString = utilityString;
	}
}
