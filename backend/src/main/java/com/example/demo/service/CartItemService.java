package com.example.demo.service;

import java.util.List;
import com.example.demo.entities.CartItem;

public interface CartItemService {
	public List<CartItem> getAllCartItems(int userId);
	public CartItem getCartItem(int userId, int cartItemId);
	public CartItem addCartItem(int userId, int productId);
	public boolean removeCartItem(int userId, int productId);
	public CartItem changeQuantityCartItem(int quantity, int userId, int productId);
}
