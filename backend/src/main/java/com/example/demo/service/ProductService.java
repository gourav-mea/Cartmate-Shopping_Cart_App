package com.example.demo.service;

import java.util.List;

import com.example.demo.entities.Product;

public interface ProductService {
	public List<Product> getProducts();
	public Product getProduct(int productId);
	public Product addProduct(Product product);
	public Product modifyProduct(Product product);
	public boolean removeProduct(int productId);
	public List<Product> addProductList(List<Product> productList);
	
	public List<Product> getProductsByCategory(String category);
	public List<Product> getProductsBySearch(String searchString);
	public List<Product> getProductsByCategoryWithFilter(String category, String[] filters);
}
