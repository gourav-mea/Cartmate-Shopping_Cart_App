package com.example.demo.service;

import java.util.List;

import com.example.demo.entities.Order;

public interface OrderService {
	public List<Order> getOrders(int userId);
	public Order createOrder(Order order);
}
