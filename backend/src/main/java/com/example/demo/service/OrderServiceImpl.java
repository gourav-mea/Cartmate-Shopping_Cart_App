package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.OrderDao;
import com.example.demo.entities.Order;

@Service
public class OrderServiceImpl implements OrderService {

	@Autowired
	private OrderDao orderDao;
	
	@Override
	public List<Order> getOrders(int userId) {
		return orderDao.findByUserUserId(userId);
	}

	@Override
	public Order createOrder(Order order) {
		// TODO Auto-generated method stub
		return orderDao.save(order);
	}

}
