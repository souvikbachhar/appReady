package com.souvik.app.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.souvik.app.entity.User;

public interface UserRepository <C> extends CrudRepository<User, Long>{

	List<User> findByUserNameIgnoreCase(String userName);
}
