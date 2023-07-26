package com.example.demo.service;

import java.util.List;


import com.example.demo.entities.Address;


public interface AddressService {
	public List<Address> getAddresses(int userId);
	public List<Address> addAddress(Address address);
	public List<Address> updateAddress(Address address);
	public boolean removeAddress(int addressId);
}
