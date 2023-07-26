package com.example.demo.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.Address;


public interface AddressDao extends JpaRepository<Address, Integer> {
	public List<Address> findAllByUserUserId(Object userUserId);
}
