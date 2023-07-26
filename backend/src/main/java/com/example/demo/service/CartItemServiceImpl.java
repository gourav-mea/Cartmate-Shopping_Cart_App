package com.example.demo.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.CartItemDao;
import com.example.demo.dao.ProductDao;
import com.example.demo.entities.CartItem;
import com.example.demo.entities.Product;
import com.example.demo.entities.User;

@Service
public class CartItemServiceImpl implements CartItemService {
	
	@Autowired
	private CartItemDao cartItemDao;
	@Autowired
	private ProductDao productDao;
	
	@Override
	public List<CartItem> getAllCartItems(int userId) {
		return cartItemDao.findAllByUserUserId(userId);
	}
	
	@SuppressWarnings("deprecation")
	@Override
	public CartItem getCartItem(int userId, int cartItemId) {
		return cartItemDao.getById(cartItemId);
	}
	@SuppressWarnings("deprecation")
	@Override
	public CartItem addCartItem(int userId, int productId) {
		CartItem cartItem = cartItemDao.findByUserUserIdAndProductId(userId, productId);
		if(cartItem!=null) {
			cartItem.setQuantity(cartItem.getQuantity() + 1);
			
			Product product = productDao.getById(productId);
			List<Integer> list= product.getIsAddedToCart();
			if(list==null) {
				list = new ArrayList<>();
			}
			list.add(userId);
			product.setIsAddedToCart(list);
			productDao.save(product);
			
			return cartItem;
		}else {
			CartItem cartItem1 = new CartItem(1, new Product(productId), new User(userId));
			
			Product product = productDao.getById(productId);
			List<Integer> list= product.getIsAddedToCart();
			if(list==null) {
				list = new ArrayList<>();
			}
			list.add(userId);
			product.setIsAddedToCart(list);
			productDao.save(product);
			
			cartItemDao.save(cartItem1);
			return cartItem1;
		}
	}

	@SuppressWarnings("deprecation")
	@Override
	public boolean removeCartItem(int userId, int productId) {
//		extra for additional feature of saving product is added to cart
		Product product = productDao.getById(productId);
		List<Integer> list= product.getIsAddedToCart();
		list.removeAll(Collections.singleton(userId));
		product.setIsAddedToCart(list);
		productDao.save(product);
		
		CartItem cartItem = cartItemDao.findByUserUserIdAndProductId(userId, productId);
		if(cartItem!=null) {
			cartItemDao.deleteByUserUserIdAndProductId(userId, productId);
			return true;
		}	
		return false;
	}
	
	@Override
	public CartItem changeQuantityCartItem(int quantity, int userId, int productId) {
		CartItem cartItem = cartItemDao.findByUserUserIdAndProductId(userId, productId);
		cartItem.setQuantity(cartItem.getQuantity() + quantity);
		cartItemDao.save(cartItem);
		return cartItem;
	}
}
