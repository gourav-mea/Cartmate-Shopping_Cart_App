package com.example.demo.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.Order;

public interface OrderDao extends JpaRepository<Order, Integer> {
	public List<Order> findByUserUserId(Object userUserId);
}
