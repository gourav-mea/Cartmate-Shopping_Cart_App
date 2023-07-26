package com.example.demo.controller;

import java.util.List;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.demo.entities.Address;
import com.example.demo.entities.CartItem;
import com.example.demo.entities.Login;
import com.example.demo.entities.Order;
import com.example.demo.entities.OrderItem;
import com.example.demo.entities.Product;
import com.example.demo.entities.Quantity;
import com.example.demo.entities.User;
import com.example.demo.service.AddressService;
import com.example.demo.service.CartItemService;
import com.example.demo.service.OrderService;
import com.example.demo.service.ProductService;
import com.example.demo.service.UserService;

@RestController
public class addProductController {
	
	@Autowired
	private ProductService productService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private AddressService addressService;
	
	@Autowired
	private CartItemService cartItemService;
	
	@Autowired
	private OrderService orderService;
	
	
//	*****************************************************************************************
//	User Management
	
//	Login RestAPI
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	@PostMapping("/login")
	public int loginUser(@RequestBody Login login) {
		return this.userService.loginUser(login.getemailLogin(), login.getpasswordLogin());
	}
	
//	Get OTP On mail function
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	@PostMapping("/signup/getotp")
	public ResponseEntity<String> getMailOtpUser(@RequestBody User user) {
		return this.userService.getMailOtpUser(user.getEmail());
	}
	
//	verify email function
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	@PostMapping("/signup/verifyotp")
	public ResponseEntity<String> verifyMailOtpUser(@RequestBody User user) {
		return this.userService.verifyMailOtpUser(user.getOtpEmailString());
	}
	
//	SignUp RestAPI
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	@PostMapping("/signup")
	public ResponseEntity<String> signupUser(@RequestBody User user) {
		return this.userService.signupUser(user);
	}
	
//	logout RestAPI
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	@PostMapping("/logout")
	public ResponseEntity<String> logoutUser(@RequestBody User user) {
		return this.userService.logoutUser(user);
	}
	
//	forgot password RestAPI
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	@PostMapping("/forgotPassword")
	public ResponseEntity<String> forgotPasswordUser(@RequestBody Login login) {
		return this.userService.forgotPasswordUser(login.getemailLogin());
	}
	
//	Reset password RestAPI
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	@PostMapping("/resetPassword")
	public ResponseEntity<String> resetPasswordUser(@RequestBody User user) {
		return this.userService.resetPasswordUser(user.getResetTokenString(), user.getPassword());
	}
	
//	Get profile by id
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	@GetMapping("user/getprofile/{userId}")
	public User getProfile(@PathVariable String userId) {
		try {
			return this.userService.getProfile(Long.parseLong(userId));
		} catch (Exception e) {
			// TODO: handle exception
		}
		return null;
	}

//	Update user profile
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	@PutMapping("user/update")
	public User updateUser(@RequestBody User user) {
		try {
			return this.userService.updateUser(user);
		} catch (Exception e) {
			// TODO: handle exception
		}
		return null;
	}
	
	
//	*****************************************************************************************************
//	Product Management
//	Get all the product
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	@GetMapping("/products")
	public List<Product> getProducts(){
		return productService.getProducts();
	}
	
//	get single product by id
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	@GetMapping("/products/getById/{productId}")
	public Product getProduct(@PathVariable String productId) {
		return productService.getProduct(Integer.parseInt(productId));
	}
	
//	add product
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	@PostMapping("/products/addProduct")
	public Product addProduct(@RequestBody Product product) {
		return this.productService.addProduct(product);
	}
	
//	add product list, can be useful if accidently deleted table
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	@PostMapping("/products/addProductList")
	public List<Product> addProductList(@RequestBody List<Product> productList) {
		return this.productService.addProductList(productList);
	}
	
//	update product
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	@PostMapping("/products/update")
	public Product modifyProduct(@RequestBody Product product) {
		return this.productService.modifyProduct(product);
	}
	
	// get product by category
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	@GetMapping("/products/category/{category}")
	public List<Product> getProductsByCategory(@PathVariable String category) {
		return this.productService.getProductsByCategory(category);
	}
	// get product by search string
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	@GetMapping("products/search/{searchString}")
	public List<Product> getProductsBySerach(@PathVariable String searchString) {
		return this.productService.getProductsBySearch(searchString);
	}

//		Still have to implement
	// get filtered product by category
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	@PostMapping("products/{category}/getFilteredProducts")
	public List<Product> getProductsByCategoryWithFilter(@PathVariable String searchString,
			@RequestBody String[] filterNames) {

		return null;
	}

	// remove product
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	@DeleteMapping("/products/delete/{productId}")
	public ResponseEntity<HttpStatus> removeProduct(@PathVariable String productId) {
		try {
			this.productService.removeProduct(Integer.parseInt(productId));
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<HttpStatus>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
		
//	*************************************************************************************************************************************
//	user address management
		
//	get address by user id
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	@GetMapping("/user/{userId}/addresses")
	public List<Address> getAddresses(@PathVariable String userId) {
		try {
			return this.addressService.getAddresses(Integer.parseInt(userId));
		} catch (Exception e) {
			// TODO: handle exception
			System.err.println(e.getMessage());
		}
		return null;
	}

//	add address to user id
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	@PostMapping("/user/{userId}/addAddress")
	public List<Address> addAddresses(@RequestBody Address address, @PathVariable String userId) {
		try {
			return this.addressService.addAddress(address);
		} catch (Exception e) {
			// TODO: handle exception
			System.err.println(e.getMessage());
		}

		return null;
	}
	
	
	
//	*****************************************************************************************************************
//	Cart Item Management
	
//	Get all cart items by user id
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	@GetMapping("/cart/{userId}/getCart")
	public List<CartItem> getAllCartItems(@PathVariable String userId) {
		return cartItemService.getAllCartItems(Integer.parseInt(userId));
	}
	
//	get a single cart item by cart item id and user id
	@GetMapping("/cart/{userId}/getCartItem/{cartItemId}")
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	public CartItem getCartItem(@PathVariable String userId, @PathVariable String cartItemId) {
		return cartItemService.getCartItem(Integer.parseInt(userId), Integer.parseInt(cartItemId));
	}

//	Add to cart API
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	@GetMapping("/cart/{userId}/add/{productId}")
	public CartItem addCartItem(@PathVariable String userId, @PathVariable String productId) {
		return cartItemService.addCartItem(Integer.parseInt(userId), Integer.parseInt(productId));
	}

//	Remove from cart
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	@DeleteMapping("/cart/{userId}/remove/{productId}")
	public boolean removeCartItem(@PathVariable String userId, @PathVariable String productId) {
		return cartItemService.removeCartItem(Integer.parseInt(userId), Integer.parseInt(productId));
	}

//	Change quantity in cart item
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	@PostMapping("cart/{userId}/changeQuantity/{productId}")
	public CartItem changeQuantityCartItem(@RequestBody Quantity quantity, @PathVariable String userId,
			@PathVariable String productId) {
		return cartItemService.changeQuantityCartItem(quantity.getQuantity(), Integer.parseInt(userId),
				Integer.parseInt(productId));
	}

	
//	*****************************************************************************************************************
//	Order Item API's Management
	
//	Get order from user id API
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	@GetMapping("/order/{userId}/getOrders")
	public List<Order> getOrders(@PathVariable String userId) {
		return orderService.getOrders(Integer.parseInt(userId));
	}
	
//	
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	@GetMapping("/order/{userId}/createOrder")
	public Order createOrder(@PathVariable String userId) {
		Order order = new Order();
		order.setUser(new User(Integer.parseInt(userId)));
		List<OrderItem> orderItems = new ArrayList<>();
		
		List<CartItem> cartItems = getAllCartItems(userId);
		for(CartItem cartItem : cartItems) {
			OrderItem orderItem = new OrderItem();
			orderItem.setOrder(order);
			orderItem.setProduct(cartItem.getProduct());
			orderItem.setQuantity(cartItem.getQuantity());
			orderItem.setOrderStatus("Order Created");
			orderItems.add(orderItem);
			
			order.setOrderItems(orderItems);
		}
		return orderService.createOrder(order);
	}
	
	
	
	
	
	
}
