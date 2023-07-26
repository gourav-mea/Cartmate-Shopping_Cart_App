package com.example.demo.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entities.CartItem;

import jakarta.transaction.Transactional;

public interface CartItemDao extends JpaRepository<CartItem, Integer> {
	public List<CartItem> findAllByUserUserId(Object userUserId);
	@Transactional
	void deleteByUserUserIdAndProductId(Object userUserId, Object productId);
	CartItem findByUserUserIdAndProductId(Object userUserId, Object productId);
}
