package com.souvik.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.souvik.app.request.UserRequest;
import com.souvik.app.response.UserResponse;
import com.souvik.app.service.LoginService;


@RestController
@RequestMapping("app")
public class LoginController {
	
	@Autowired
	LoginService loginService;

	 @RequestMapping(value = "/validateCredentials", method = RequestMethod.POST,consumes = "text/plain")
	    public UserResponse validateCredentials(@RequestBody String request){
		 System.out.println(request);
		 Gson gson = new Gson();
		 UserRequest userRequest= gson.fromJson(request, UserRequest.class);
		 return loginService.validateCredentials(userRequest);
	    }
}
