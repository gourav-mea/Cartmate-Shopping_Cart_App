import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './ContextAPI';

export default function Cart() {
    const { userId } = useContext(UserContext);
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [cartLength, setCartLength] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        loadCartItems();
    }, [userId]);

    const loadCartItems = async () => {
        if (userId != -1 && userId != 'undefined') {
            const result = await axios.get(`http://localhost:8080/cart/${userId}/getCart`);
            setCartLength(result.data.length);
            const sum = result.data.reduce((accumulator, current) => accumulator + current.product.price * current.quantity, 0);
            setTotalPrice(sum)
            setCartItems(result.data);
            window.scrollTo({ top: 0 });
        } else {
            navigate("/login");
        }
    };

    const removeCartButton = async (productId) => {
        await axios.delete(`http://localhost:8080/cart/${userId}/remove/${productId}`);
        loadCartItems();
    }
    const quantityChange = async (productId, q) => {
        try {
            await axios.post(`http://localhost:8080/cart/${userId}/changeQuantity/${productId}`,
                { quantity: q }
            );
            loadCartItems();
        } catch (error) {
            console.error(error); 
        }
    }
    const handlecheckout =async () => {
        try {
            await axios.get(`http://localhost:8080/order/${userId}/createOrder`);
            cartItems.map((cartItem) => (removeCartButton(cartItem.product.id)));
            alert("order Created")        
        } catch (error) {
            console.error(error);
        }
    }


  return (
    <>
          <section className="h-100 h-custom" >
              <div className="container py-5 h-100">
                  <div className="row d-flex justify-content-center align-items-center h-100">
                      <div className="col">
                          <div className="card">
                              <div className="card-body p-4">

                                  <div className="row">

                                      <div className="col-lg-7">
                                          <h5 className="mb-3"><Link to="/" className="text-body"><i
                                              className="fas fa-long-arrow-alt-left me-2"></i>Continue shopping</Link></h5>
                                          <hr/>

                                              <div className="d-flex justify-content-between align-items-center mb-4">
                                                  <div>
                                                  <p className="mb-1 text-danger">CartMate का कार्ट, आपका अपना Basket</p>
                                                      <p className="mb-0">You have {cartLength} items in your cart</p>
                                                  </div>
                                                  <div>
                                                      <p className="mb-0"><span className="text-muted">Sort by:</span> <a href="#!"
                                                          className="text-body">price <i className="fas fa-angle-down mt-1"></i></a></p>
                                                  </div>
                                              </div>
                                            {/* Cart Items */}
                                          {cartItems.map((cartItem, index) => (
                                              <div className="card mb-3" key={index}>
                                                  <div className="card-body">
                                                      <div className="d-flex justify-content-between">
                                                          <div className="d-flex flex-row align-items-center">
                                                              <Link to={`/productDetails/${cartItem.product.id}`}>
                                                                  <img
                                                                      src={cartItem.product.image}
                                                                      className="img-fluid rounded-3" alt="Shopping item" style={{width: "65px"}}/>
                                                              </Link>
                                                              <Link to={`/productDetails/${cartItem.product.id}`} className="ms-3 text-dark" style={{ width: "300px" }}>
                                                                  <h5>{cartItem.product.name}</h5>
                                                                  <p className="text-truncate small mb-0">{cartItem.product.details}</p>
                                                              </Link>
                                                          </div>
                                                          <div className="d-flex flex-row align-items-center">
                                                              <div style={{width: "50px"}}>
                                                                  <button onClick={() => quantityChange(cartItem.product.id, 1)}><i onClick={() => quantityChange(cartItem.product.id, 1)}  className="fas fa-plus"></i></button>
                                                                  <h5 className="fw-normal mb-0">{cartItem.quantity}</h5>
                                                                  <button onClick={()=>quantityChange(cartItem.product.id, -1)}><i className="fas fa-minus"></i></button>
                                                              </div>
                                                              <div style={{width: "80px"}}>
                                                                  <h5 className="mb-0">₹{cartItem.product.price}</h5>
                                                              </div>
                                                              <button onClick={()=>removeCartButton(cartItem.product.id)} ><i className="fas fa-trash-alt"></i></button>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                            ))}
                                      </div>

                                      {/* CardDetails */}
                                      <div className="col-lg-5">

                                          <div className="card bg-primary text-white rounded-3">
                                              <div className="card-body" style={{backgroundColor:"rgb(51,0,51)"}}>
                                                  <div className="d-flex justify-content-between align-items-center mb-4">
                                                      <h5 className="mb-0">Card details</h5>
                                                      <img src="/CartMate_logo.png"
                                                          className="img-fluid rounded-3" style={{width: "45px"}} alt="Avatar"/>
                                                  </div>

                                                  <p className="small mb-2">Card type</p>
                                                  <a href="#!" type="submit" className="text-white"><i
                                                      className="fab fa-cc-mastercard fa-2x me-2"></i></a>
                                                  <a href="#!" type="submit" className="text-white"><i
                                                      className="fab fa-cc-visa fa-2x me-2"></i></a>
                                                  <a href="#!" type="submit" className="text-white"><i className="fab fa-cc-paypal fa-2x"></i></a>

                                                  <form className="mt-4">
                                                      <div className="form-outline form-white mb-4">
                                                          <input type="text" id="typeName" className="form-control form-control-lg" siez="17"
                                                              placeholder="Name" />
                                                          <label className="form-label" for="typeName">Cardholder's Name</label>
                                                      </div>

                                                      <div className="form-outline form-white mb-4">
                                                          <input type="text" id="typeText" className="form-control form-control-lg" siez="17"
                                                              placeholder="XXXX XXXX XXXX XXXX" minlength="19" maxlength="19" />
                                                          <label className="form-label" for="typeText">Card Number</label>
                                                      </div>

                                                      <div className="row mb-4">
                                                          <div className="col-md-6">
                                                              <div className="form-outline form-white">
                                                                  <input type="text" id="typeExp" className="form-control form-control-lg"
                                                                      placeholder="MM/YYYY" size="7" minlength="7" maxlength="7" />
                                                                  <label className="form-label" for="typeExp">Expiration</label>
                                                              </div>
                                                          </div>
                                                          <div className="col-md-6">
                                                              <div className="form-outline form-white">
                                                                  <input type="password" id="typeText" className="form-control form-control-lg"
                                                                      placeholder="&#9679;&#9679;&#9679;" size="1" minlength="3" maxlength="3" />
                                                                  <label className="form-label" for="typeText">Cvv</label>
                                                              </div>
                                                          </div>
                                                      </div>

                                                  </form>

                                                  <hr className="my-4"/>

                                                      <div className="d-flex justify-content-between">
                                                          <p className="mb-2">Subtotal</p>
                                                      <p className="mb-2">₹{totalPrice}</p>
                                                      </div>

                                                      <div className="d-flex justify-content-between">
                                                          <p className="mb-2">Shipping</p>
                                                      <p className="mb-2 "><s>₹{cartLength * 40}</s></p>
                                                      </div>

                                                      <div className="d-flex justify-content-between mb-4">
                                                          <p className="mb-2">Total(Incl. taxes)</p>
                                                      <p className="mb-2">₹{totalPrice}</p>
                                                      </div>

                                                      <button type="button" onClick={handlecheckout} className="btn btn-info btn-block btn-lg">
                                                          <div className="d-flex justify-content-between">
                                                          <span>₹{totalPrice}</span>
                                                              <span>Checkout <i className="fas fa-long-arrow-alt-right ms-2"></i></span>
                                                          </div>
                                                      </button>

                                              </div>
                                          </div>

                                      </div>

                                  </div>

                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
    </>
  )
}
