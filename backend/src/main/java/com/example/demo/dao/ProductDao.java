package com.example.demo.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.Product;

public interface ProductDao extends JpaRepository<Product, Integer> {
	public List<Product> findByCategory(String category);
	public List<Product> findByCategoryContaining(String category);
	public List<Product> findByNameContaining(String searchString);
}
