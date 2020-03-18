package com.souvik.app.response;

public class UserResponse {
	private String userName;
	private boolean userNameValid;
	private boolean authencticationStatus;
	private CommonResponse commonResponse;
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public boolean isUserNameValid() {
		return userNameValid;
	}
	public void setUserNameValid(boolean userNameValid) {
		this.userNameValid = userNameValid;
	}
	public boolean isAuthencticationStatus() {
		return authencticationStatus;
	}
	public void setAuthencticationStatus(boolean authencticationStatus) {
		this.authencticationStatus = authencticationStatus;
	}
	public CommonResponse getCommonResponse() {
		return commonResponse;
	}
	public void setCommonResponse(CommonResponse commonResponse) {
		this.commonResponse = commonResponse;
	}
}
