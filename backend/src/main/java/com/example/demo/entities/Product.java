package com.example.demo.entities;

import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import java.util.ArrayList;


@Entity
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	private int price;
	private String details;
	private String category;
	private String[] subcategory;
	private int offer;
	private List<Integer> isAddedToCart;
	@Lob
	@Column(columnDefinition = "MEDIUMTEXT")
	private String image;
	
	@OneToOne(mappedBy = "product")
	@JsonIgnore
	private CartItem cartItem;

	@OneToMany(mappedBy = "product")
	@JsonIgnoreProperties("product")
	@JsonIgnore
	private List<OrderItem> orderItems;
	
	
	public Product(int id, String name, int price, String details, String category, String[] subcategory, String image) {
		super();
		this.id = id;
		this.name = name;
		this.price = price;
		this.details = details;
		this.category = category;
		this.subcategory = subcategory;
		this.image = image;
		this.cartItem = new CartItem();
		this.orderItems = new ArrayList<>();
		this.isAddedToCart = new ArrayList<>();
	}
	
	public Product() {
		super();
		this.isAddedToCart = new ArrayList<>();
		// TODO Auto-generated constructor stub
	}

	public Product(int id) {
		super();
		this.id = id;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public String getDetails() {
		return details;
	}

	public void setDetails(String details) {
		this.details = details;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String[] getSubcategory() {
		return subcategory;
	}

	public void setSubcategory(String[] subcategory) {
		this.subcategory = subcategory;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public int getOffer() {
		return offer;
	}

	public void setOffer(int offer) {
		this.offer = offer;
	}
	public CartItem getCartItem() {
		return cartItem;
	}

	public void setCartItem(CartItem cartItem) {
		this.cartItem = cartItem;
	}

	public List<OrderItem> getOrderItems() {
		return orderItems;
	}

	public void setOrderItems(List<OrderItem> orderItems) {
		this.orderItems = orderItems;
	}

	public List<Integer> getIsAddedToCart() {
		return isAddedToCart;
	}

	public void setIsAddedToCart(List<Integer> isAddedToCart) {
		this.isAddedToCart = isAddedToCart;
	}

	@Override
	public String toString() {
		return "Product [id=" + id + ", name=" + name + ", price=" + price + ", details=" + details + ", category="
				+ category + ", subcategory=" + Arrays.toString(subcategory) + ", offer=" + offer + ", isAddedToCart="
				+ isAddedToCart + ", image=" + image + ", cartItem=" + cartItem + ", orderItems=" + orderItems + "]";
	}

	
	
}
