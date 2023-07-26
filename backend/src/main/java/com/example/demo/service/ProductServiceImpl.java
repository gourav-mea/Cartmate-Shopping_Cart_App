package com.example.demo.service;

import java.util.List;
import java.util.Set;
import java.util.HashSet;
import java.util.ArrayList;

import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.ProductDao;
import com.example.demo.entities.Product;

@Service
public class ProductServiceImpl implements ProductService {
	
	@Autowired
	private ProductDao ProductDao;
	
	List<Product> list;
	public ProductServiceImpl() {
		
	}
	@Override
	public List<Product> getProducts() {
		// TODO Auto-generated method stub		
		return ProductDao.findAll();
	}
	
	@Override
	public Product getProduct(int productId) {
		// TODO Auto-generated method stub	
		Optional<Product> optionalProduct = ProductDao.findById(productId);
	    if (optionalProduct.isPresent()) {
	        return optionalProduct.get();
	    } else {
	        throw new NoSuchElementException("Product with ID " + productId + " not found");
	    }
	}
	
	@Override
	public Product addProduct(Product product) {
		product.setOffer(ThreadLocalRandom.current().nextInt(10, 51));
		ProductDao.save(product);
		return product;
	}
	
//	API to add list of products, can be useful if accidently deleted table
	@Override
	public List<Product> addProductList(List<Product> productList) {
	    for (Product product : productList) {
	        product.setOffer(ThreadLocalRandom.current().nextInt(10, 51));
	        ProductDao.save(product);
	    }
	    return productList;
	}

	
	@Override
	public Product modifyProduct(Product product) {
		ProductDao.save(product);
		return product;
	}
	
	@Override
	public List<Product> getProductsByCategory(String category) {
		return ProductDao.findByCategory(category);
	}
	

	@Override
	public boolean removeProduct(int productId) {
		Optional<Product> optionalProduct = ProductDao.findById(productId);
	    if (optionalProduct.isPresent()) {
	    	ProductDao.deleteById(productId);
	        return true;
	    } else {
	        throw new NoSuchElementException("Product with ID " + productId + " not found");
	    }
	}

	
	@Override
	public List<Product> getProductsBySearch(String searchString) {
		List<Product> productsByCategory = ProductDao.findByCategoryContaining(searchString);
		List<Product> productsByName = ProductDao.findByNameContaining(searchString);
		// Combine the two lists without duplicates
		Set<Product> products = new HashSet<>();
		products.addAll(productsByCategory);
		products.addAll(productsByName);
		return new ArrayList<>(products);
	}

//	(Still have to Implement)
	@Override
	public List<Product> getProductsByCategoryWithFilter(String category, String[] filters) {
		// TODO Auto-generated method stub
		return null;
	}
	
	
}
