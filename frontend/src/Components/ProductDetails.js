import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { UserContext } from './ContextAPI';

export default function ProductDetails() {
    const { userId } = useContext(UserContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setproduct] = useState([]);
    const [products, setproducts] = useState([]);

    useEffect(() => {
        loadproduct();
    }, [id]);

    const loadproduct = async () => {
        const result = await axios.get(`http://localhost:8080/products/getById/${id}`);
        const list = result.data.isAddedToCart;
        const newList = list ? [...list] : [];
        result.data.isAddedToCart = newList;
        console.log(result);
        setproduct(result.data);
        if (result.data.isAddedToCart !== null && result.data.isAddedToCart.includes(userId)) {
            setIsAdded(true);
        }
        else{
            setIsAdded(false);
        }
        window.scrollTo({ top: 0 })
    };

    useEffect(() => {
        loadproducts();
    }, [product]);

    const loadproducts = async () => {
        const result = await axios.get(`http://localhost:8080/products/category/${product.category}`);
        setproducts(result.data.map(product => ({ ...product, isLoading: false })));
    };

    const handleAddToCartClick = async (productId, index) => {
        if (userId != -1 && userId != 'undefined') {  
            try {
                setproducts(prevProducts => {
                    const newProducts = [...prevProducts];
                    newProducts[index] = { ...newProducts[index], isLoading: true };
                    return newProducts;
                });
                await axios.get(`http://localhost:8080/cart/${userId}/add/${productId}`);
                setproducts(prevProducts => {
                    const newProducts = [...prevProducts];
                    const currentList = newProducts[index].isAddedToCart; // get the current list
                    const updatedList = currentList ? [...currentList, userId] : [userId]; // create a new array by spreading the current list and adding the new value or create a new list with the new value if currentList is null
                    newProducts[index] = { ...newProducts[index], isAddedToCart: updatedList, isLoading: false }; // update the isAddedToCart property with the updatedList
                    return newProducts;
                });
    
            } catch (error) {
                console.log(error);
                setproducts(prevProducts => {
                    const newProducts = [...prevProducts];
                    newProducts[index] = { ...newProducts[index], isLoading: false };
                    return newProducts;
                });
            }
        }
        else{
            alert("You need to be logged in to add product in cart")
            navigate("/login");
        }
    };
    const [isAdded, setIsAdded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const handleAddToCartClickDetail = async (productId) => {
        if (userId != -1 && userId != 'undefined') {
            try {
                setIsLoading(true);
                await axios.get(`http://localhost:8080/cart/${userId}/add/${productId}`);
                const list = product.isAddedToCart;
                const newList = list ? [...list, userId] : [userId];
                setproduct({...product , isAddedToCart : newList}); 
                setIsAdded(true);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }else{
            alert("You need to be logged in to add product in cart")
            navigate("/login");
        }
    };

    return (
        <>
            {/* Product section*/}
            <section className="py-5 text-light">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="row gx-4 gx-lg-5 align-items-center">
                        <div className="col-md-6"><img className="card-img-top mb-5 mb-md-0" src={product.image} alt="..." /></div>
                        <div className="col-md-6">
                            <div className="small mb-1">Product ID: {product.id}</div>
                            {/* Offer badge*/}
                            <div className="badge bg-success text-white position-relative" style={{ top: "0.5rem", right: "0.5rem" }}>{product.offer}% Off</div>
                            <h1 className="display-5 fw-bolder">{product.name}</h1>
                            <div className="fs-5 mb-5">
                                <span className="text-decoration-line-through mx-2">₹{Math.ceil((100 * product.price) / (100 - product.offer))}</span>
                                <span>₹{product.price}</span>
                            </div>
                            <p className="lead">{product.details}</p>
                            <div className="d-flex">
                                
                                <button
                                    className="btn btn-outline-success mt-2"
                                    onClick={() => handleAddToCartClickDetail(product.id)}
                                    type="button"
                                    disabled={isLoading || isAdded}
                                >
                                    {isLoading ? "Adding to Cart..." : isAdded ? "Added to Cart" : "Add to Cart"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Related items section*/}
            <section className="py-5" style={{ backgroundColor: "rgb(51,0,51,0.7)" }}>
                <div className="container px-4 px-lg-5 mt-5">
                    <h2 className="fw-bolder mb-4 text-light">Related products</h2>
                    <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                        {products.slice(0, 4).map((relatedProduct, index) => (
                            <div className="col mb-5" key={index}>
                                <div className="card h-100">
                                    {/* Sale badge*/}
                                    <div className="badge bg-dark text-white position-absolute" style={{ top: "0.5rem", right: "0.5rem" }}>Sale</div>
                                    {/* Offer badge*/}
                                    <div className="badge bg-success text-white position-absolute" style={{ top: "0.5rem", left: "0.5rem" }}>{relatedProduct.offer}% Off</div>
                                    {/* Product image*/}
                                    <img className="card-img-top" src={relatedProduct.image} alt="Related Product Image" />
                                    {/* Product details*/}
                                    <div className="card-body p-4">
                                        <div className="text-center">
                                            {/* Product name*/}
                                            <h5 className="fw-bolder">{relatedProduct.name}</h5>
                                            {/* Product price*/}
                                            <span className="text-muted text-decoration-line-through">₹{Math.ceil((100 * relatedProduct.price) / (100 - relatedProduct.offer))}</span>
                                            <br />
                                            {relatedProduct.price}
                                        </div>
                                    </div>
                                    {/* Product actions*/}
                                    <div className="card-footer p-2 pt-0 border-top-0 bg-transparent">
                                        <div className="text-center">
                                            <button
                                                className="btn btn-outline-custom btn-sm mb-2"
                                                onClick={() => handleAddToCartClick(relatedProduct.id, index)}
                                                type="button"
                                                disabled={relatedProduct.isLoading || (relatedProduct.isAddedToCart !==null && relatedProduct.isAddedToCart.includes(1))}
                                            >
                                                {relatedProduct.isLoading ? "Adding to Cart..." : (relatedProduct.isAddedToCart !== null && relatedProduct.isAddedToCart.includes(1)) ? "Added to Cart" : "Add to Cart"}
                                            </button>
                                        </div>
                                        <div className="text-center"><Link to={`/productDetails/${relatedProduct.id}`} className="btn btn-sm btn-outline-custom" >Details</Link></div>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </section>
        </>
    )
}
