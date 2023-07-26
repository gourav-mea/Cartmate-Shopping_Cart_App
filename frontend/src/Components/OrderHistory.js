import React, { useState, useEffect, useContext } from 'react'
import {useNavigate } from 'react-router-dom'
import axios from 'axios';
import ContextAPI, { UserContext } from './ContextAPI';

export default function OrderHistory() {
    const { userId } = useContext(UserContext);
    const navigate = useNavigate();
    const [orders, setorders] = useState([]);
    useEffect(() => {
        loadorders();
    }, [userId]);

    const loadorders = async () => {
        if (userId != -1 && userId != 'undefined') {
            const result = await axios.get(`http://localhost:8080/order/${userId}/getOrders`);
            console.log(result.data);
            setorders(result.data);
        } else {
            navigate("/login");
        }
    };

    return (
        <>
            <section className="h-100 gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-10 col-xl-8">
                            <div className="card" style={{ borderRadius: "10px" }}>
                                <div className="card-header px-4 py-5">
                                    <h5 className="text-muted mb-0">Thanks for your Order, <span style={{ color: "#a8729a" }}>Anna</span>!</h5>
                                </div>
                                <div className="card-body p-4">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <p className="lead fw-normal mb-0" style={{ color: "#a8729a" }}>Your Order History</p>
                                    </div>

                                    {/* loop for orders */}
                                    {orders.map((order, index) => (  
                                        <div key={index}>
                                                <h6 key={index}>Order Number: {index+1}</h6>
                                                {/* loop for order_items */}
                                                {order.orderItems.map((orderItem, i)=>(
                                                    <div className="card shadow-0 border mb-4">
                                                        <div className="card-body">
                                                            <div className="row">
                                                                <div className="col-md-2">
                                                                    <img src={orderItem.product.image}
                                                                        className="img-fluid" alt="Phone" />
                                                                </div>
                                                                <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                                    <p className="text-muted mb-0">{orderItem.product.name.slice(0,20)}</p>
                                                                </div>
                                                                <div className="col-md-4 text-center d-flex justify-content-center align-items-center">
                                                                    <p className="text-muted mb-0 small">Category: {orderItem.product.category}</p>
                                                                </div>
                                                                <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                                    <p className="text-muted mb-0 small">Qty: {orderItem.quantity}</p>
                                                                </div>
                                                                <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                                    <p className="text-muted mb-0 small">₹{orderItem.product.price}</p>
                                                                </div>
                                                            </div>
                                                            <hr className="mb-4" style={{ backgroundColor: "#e0e0e0", opacity: "1" }} />
                                                            <div className="row d-flex align-items-center">
                                                                <div className="col-md-2">
                                                                    <p className="text-muted mb-0 small">Track Order</p>
                                                                </div>
                                                                <div className="col-md-10">
                                                                    <div className="progress" style={{ height: "6px", borderRadius: "16px" }}>
                                                                        <div className="progress-bar" role="progressbar"
                                                                            style={{ width: "65%", borderRadius: "16px", backgroundColor: "#a8729a", ariaValuenow: "65" }}
                                                                            aria-valuemin="0" aria-valuemax="100"></div>
                                                                    </div>
                                                                    <div className="d-flex justify-content-around mb-1">
                                                                        <p className="text-muted mt-1 mb-0 small ms-xl-5">Out for delivery</p>
                                                                        <p className="text-muted mt-1 mb-0 small ms-xl-5">Delivered</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>  
                                                ))}                                     
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
