package com.souvik.app.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import com.souvik.app.constants.AppConstants;
import com.souvik.app.entity.User;
import com.souvik.app.repository.UserRepository;
import com.souvik.app.request.UserRequest;
import com.souvik.app.response.CommonResponse;
import com.souvik.app.response.UserResponse;

@Service
public class LoginService {

	@Autowired
	UserRepository userRepository;

	Logger logger = LoggerFactory.getLogger(LoginService.class);

	public UserResponse validateCredentials(UserRequest userRequest) {
		UserResponse userResponse = new UserResponse();
		CommonResponse commonResponse = new CommonResponse();
		try {
			List<User> user = userRepository.findByUserNameIgnoreCase(userRequest.getUserName());
			if (user.size() > 0) {// userName unique constraint applied
				userResponse.setUserNameValid(true);
				userResponse.setAuthencticationStatus(
						BCrypt.checkpw(userRequest.getPassword(), user.get(0).getUserPassword()));
			} else {
				userResponse.setUserNameValid(false);
				userResponse.setAuthencticationStatus(false);
			}
			userResponse.setUserName(userRequest.getUserName());
			commonResponse.setStatus(AppConstants.SUCCESS);
			userResponse.setCommonResponse(commonResponse);
		} catch (Exception e) {
			logger.error(e.getMessage());
			commonResponse.setStatus(AppConstants.FAILED);
			commonResponse.setError(e.getMessage());
		}
		return userResponse;
	}
}
