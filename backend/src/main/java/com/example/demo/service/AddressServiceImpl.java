package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.AddressDao;
import com.example.demo.entities.Address;

@Service
public class AddressServiceImpl implements AddressService {

	@Autowired
	private AddressDao addressDao;
	
	@Override
	public List<Address> getAddresses(int userId) {
		return addressDao.findAllByUserUserId(userId);
	}

	@Override
	public List<Address> addAddress(Address address) {
		addressDao.save(address);
		return getAddresses(address.getUser().getUserId());
	}

	@Override
	public List<Address> updateAddress(Address address) {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public boolean removeAddress(int addressId) {
		// TODO Auto-generated method stub
		return false;
	}

}
