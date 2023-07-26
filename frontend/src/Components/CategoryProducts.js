import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { UserContext } from './ContextAPI';

export default function CategoryProducts() {
    const { userId } = useContext(UserContext);
    const navigate = useNavigate();
    const { category } = useParams();
    const [products, setproduct] = useState([]);
    const [sortType, setSortType] = useState("price");
    useEffect(() => {
        loadproducts("id");
    }, [category]);

    const loadproducts = async (sortType) => {
        const result = await axios.get(`http://localhost:8080/products/category/${category}`);
        let sortedProducts = result.data;

        if (sortType === "price") {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortType === "name") {
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortType === "id") {
            sortedProducts.sort((a, b) => a.id - b.id);
        }
        setproduct(sortedProducts.map((product) => ({ ...product, isLoading: false })));
    };
    const handleSortChange = (event) => {
        setSortType(event.target.value);
        loadproducts(event.target.value);
    };
    const handleAddToCartClick = async (productId, index) => {
        if (userId != -1 && userId != 'undefined') {
            try {
                setproduct(prevProducts => {
                    const newProducts = [...prevProducts];
                    newProducts[index] = { ...newProducts[index], isLoading: true };
                    return newProducts;
                });
                await axios.get(`http://localhost:8080/cart/${userId}/add/${productId}`);
                setproduct(prevProducts => {
                    const newProducts = [...prevProducts];
                    const currentList = newProducts[index].isAddedToCart; // get the current list
                    const updatedList = currentList ? [...currentList, userId] : [userId]; // create a new array by spreading the current list and adding the new value or create a new list with the new value if currentList is null
                    newProducts[index] = { ...newProducts[index], isAddedToCart: updatedList, isLoading: false }; // update the isAddedToCart property with the updatedList
                    return newProducts;
                });
            } catch (error) {
                console.log(error);
                setproduct(prevProducts => {
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
    
    return (
        <>
            <div className='my-4'>
                <label htmlFor="sort">Sort by:</label>
                <select id="sort" value={sortType} onChange={handleSortChange}>
                    <option value="price">Price(Low to High)</option>
                    <option value="name">Name</option>
                    <option value="id">Time(Newest First)</option>
                </select>
            </div>
            {products.map((product, index) => (
                <div data-aos={(index + 1) % 2 == 0 ? "fade-up-right" : "fade-up-left"}>
                    <div className="container py-1">
                        <div className="row justify-content-center mb-3">
                            <div className="col-md-12 col-xl-10">
                                <div className="card shadow-0 border rounded-3">
                                    {/* Offer badge*/}
                                    <div className="badge bg-success text-white position-absolute" style={{ top: "0.5rem", left: "0.5rem" }}>{product.offer}% Off</div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                                                <div className="bg-image hover-zoom ripple rounded ripple-surface">
                                                    <img src={product.image}
                                                        className="w-100" />
                                                    <a href="#!">
                                                        <div className="hover-overlay">
                                                            <div className="mask" style={{ backgroundColor: "rgba(253, 253, 253, 0.15)" }}></div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-lg-6 col-xl-6">
                                                <h5>{product.name}</h5>
                                                <div className="d-flex flex-row">
                                                    <div className="text-danger mb-1 me-2">
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                    </div>
                                                    <span>310</span>
                                                </div>
                                                <div className="mt-1 mb-0 text-muted small">
                                                    <span>100% cotton</span>
                                                    <span className="text-primary"> • </span>
                                                    <span>Light weight</span>
                                                    <span className="text-primary"> • </span>
                                                    <span>Best finish<br /></span>
                                                </div>
                                                <div className="mb-2 text-muted small">
                                                    <span>Unique design</span>
                                                    <span className="text-primary"> • </span>
                                                    <span>For men</span>
                                                    <span className="text-primary"> • </span>
                                                    <span>Casual<br /></span>
                                                </div>
                                                <p className="text-truncate mb-4 mb-md-0">
                                                    {product.details}
                                                </p>
                                            </div>
                                            <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                                                <div className="d-flex flex-row align-items-center mb-1">
                                                    <h4 className="mb-1 me-1">₹{product.price}</h4>
                                                    <span className="text-danger"><s>₹{Math.ceil((100 * product.price) / (100 - product.offer))}</s></span>
                                                </div>
                                                <h6 className="text-success">Free shipping</h6>
                                                <div className="d-flex flex-column mt-4">
                                                    <Link to={`/productDetails/${product.id}`} className="btn btn-primary btn-sm" type="button">Details</Link>
                                                    <button
                                                        className="btn btn-outline-primary btn-sm mt-2"
                                                        onClick={() => handleAddToCartClick(product.id, index)}
                                                        type="button"
                                                        disabled={product.isLoading || (product.isAddedToCart !== null && product.isAddedToCart.includes(1))}
                                                    >
                                                        {product.isLoading ? "Adding to Cart..." : (product.isAddedToCart !== null && product.isAddedToCart.includes(1)) ? "Added to Cart" : "Add to Cart"}
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
            ))}
        </>
    )
}
