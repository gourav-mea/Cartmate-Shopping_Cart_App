import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import { UserContext } from './ContextAPI';


export default function UserProfile() {
    const { userId } = useContext(UserContext);
    const [products, setproducts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [user, setUser] = useState({
        name: "",
        email: "",
        phoneNo: "",
        password: "",
    })
    const [address, setAddress] = useState({
        street: "",
        city: "",
        state: "",
        pincode: "",
    })
    const [addresses, setAddresses] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        loadprofilepage();
    }, [userId]);

    const loadprofilepage = async () => {
        if (userId != -1 && userId != 'undefined'){
            const result1 = await axios.get(`http://localhost:8080/user/getprofile/${userId}`);
            setUser(result1.data);
            const result2 = await axios.get(`http://localhost:8080/user/${userId}/addresses`);
            setAddresses(result2.data);
            const result = await axios.get("http://localhost:8080/products");
            setproducts(result.data);
        }else{
            navigate("/login");
        }
    };

    const { name, email, phoneNo, password } = user;
    const { street, city, state, pincode } = address;

    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();
        await axios.put("http://localhost:8080/user/update", user);
        setIsEditing(false);
        window.scrollTo({ top: 0 })
    };

    const onInputChangeAddress = e => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const onSubmitAddress = async e => {
        e.preventDefault();
        await axios.post(`http://localhost:8080/user/${userId}/addAddress`, {...address, user:{userId:userId}});
        setIsAdding(false);
        window.scrollTo({ top: 0 })
    };

    const handleEditButtonClick = () => {
        setIsEditing(true);
    }
    const handleAddAddressButtonClick = () => {
        setIsAdding(true);
    }
    return (
        <>
            <section className="h-100 gradient-custom-2">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-lg-9 col-xl-7">
                            <div className="card">
                                <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: "rgb(43,0,43)", height: "200px" }}>
                                    <div className="ms-4 mt-4 p-1 d-flex flex-column" style={{ width: "150px" }}>
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                            alt="Generic placeholder image" className="img-fluid img-thumbnail mt-4 mb-2"
                                            style={{ width: "150px", zIndex: "1" }} />
                                        <button type="button" className="btn btn-outline-dark" data-mdb-ripple-color="dark"
                                            style={{ zIndex: "1" }} onClick={handleEditButtonClick}>
                                            Edit profile
                                        </button>
                                    </div>
                                    <div className="ms-3" style={{ marginTop: "130px" }}>
                                        <h5>Your Profile</h5>
                                        <p>CartMate</p>
                                    </div>
                                    <div className="position-absolute t-0 m-3" style={{ right: 0, width: "7%" }}>
                                        <img src="/CartMate_logo.png" className="img-fluid " style={{ width: "100%" }} alt="Deals-Pic-2" />
                                    </div>
                                </div>
                                <div className="p-4 text-black" style={{ backgroundColor: "#f8f9fa" }}>
                                    <div className="d-flex justify-content-end text-center py-1">
                                        <div className='mx-3'>
                                            <Link to="/cart" className="mb-1 h5"><i className='fa fa-shopping-cart'></i></Link>
                                            <p className="small text-muted mb-0">Go to Cart</p>
                                        </div>
                                        <div>
                                            <a onClick={handleAddAddressButtonClick} className="mb-1 h5"><i className='fa fa-plus'></i><i className='fa fa-home'></i></a>
                                            <p className="small text-muted mb-0">Add Address</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body p-4 text-black">
                                    <div className="mb-5">

                                        {/* About Section */}
                                        <p className="lead fw-normal mb-1">About</p>
                                        <div className="p-4 mb-3" style={{ backgroundColor: "#f8f9fa" }}>
                                            
                                            {/* user profile about section */}
                                            <div style={{ display: isEditing ? "block" : "none" }}>
                                                
                                                <form onSubmit={e => onSubmit(e)}>
                                                    {/* Input Form when editing*/}
                                                    <div className="form-group mb-2">
                                                        <label className="col-md-4 control-label">Name:</label>
                                                        <div className="input-group">
                                                            <input name="name" placeholder="Name" value={name}
                                                                onChange={e => onInputChange(e)} className="form-control" type="text" required />
                                                        </div>
                                                    </div>

                                                    <div className="form-group mb-2">
                                                        <label className="col-md-4 control-label">E-Mail:</label>
                                                        <div className="input-group">
                                                            <input name="email" placeholder="Email" value={email?.slice(0, 4) + "*****" + email?.slice(-8)}
                                                                className="form-control" type="email" readOnly />
                                                        </div>
                                                    </div>

                                                    <div className="form-group mb-2">
                                                        <label className="col-md-4 control-label">Phone Number:</label>
                                                        <div className="input-group">
                                                            <input name="phoneNo" placeholder="Phone Number" value={phoneNo}
                                                                onChange={e => onInputChange(e)} className="form-control" type="text" required />
                                                        </div>
                                                    </div>

                                                    <div className="form-group mb-2">
                                                        <label className="col-md-4 control-label">Password:</label>
                                                        <div className="input-group">
                                                            <input name="password" placeholder="Password" value={password?.slice(0, 2) + "********"} className="form-control" type="password" readOnly />
                                                        </div>
                                                        <Link to="/forgotPassword" className='text-dark'>Click here to change password</Link>
                                                    </div>

                                                    <button className='btn btn-outline-custom mx-1 mt-3'>Submit</button>

                                                </form>
                                            </div>

                                            <div style={{ display: isEditing === false ? "block" : "none" }}>
                                                {/* Readonly type when not editing */}
                                                <div className="form-group mb-2">

                                                    <label className="col-md-4 control-label">Name:</label>
                                                    {name}
                                                </div>

                                                <div className="form-group mb-2">
                                                    <label className="col-md-4 control-label">E-Mail:</label>
                                                    {email?.slice(0, 4)}*****{email?.slice(-8)}
                                                </div>

                                                <div className="form-group mb-2">
                                                    <label className="col-md-4 control-label">Phone Number:</label>
                                                    {phoneNo}
                                                </div>

                                                <div className="form-group mb-2">
                                                    <label className="col-md-4 control-label">Password:</label>
                                                    {password?.slice(0, 2)}********
                                                </div>
                                            </div>

                                        </div>
                                        
                                        {/* Address Section */}
                                        <p className="lead fw-normal mb-1">Your Addresses</p>
                                        <div className="p-4 mb-3" style={{ backgroundColor: "#f8f9fa" }}>

                                            {/* user profile Address section */}
                                            <div style={{ display: isAdding ? "block" : "none" }}>

                                                <form onSubmit={e => onSubmitAddress(e)}>
                                                    {/* Input Form when Adding*/}
                                                    <div className="form-group mb-2">
                                                        <label className="col-md-4 control-label">Street:</label>
                                                        <div className="input-group">
                                                            <input name="street" placeholder="Street" value={street}
                                                                onChange={e => onInputChangeAddress(e)} className="form-control" type="text" required />
                                                        </div>
                                                    </div>

                                                    <div className="form-group mb-2">
                                                        <label className="col-md-4 control-label">City:</label>
                                                        <div className="input-group">
                                                            <input name="city" placeholder="City" value={city}
                                                                className="form-control" type="text" onChange={e => onInputChangeAddress(e)} required />
                                                        </div>
                                                    </div>

                                                    <div className="form-group mb-2">
                                                        <label className="col-md-4 control-label">State:</label>
                                                        <div className="input-group">
                                                            <input name="state" placeholder="State" value={state}
                                                                onChange={e => onInputChangeAddress(e)} className="form-control" type="text" required />
                                                        </div>
                                                    </div>

                                                    <div className="form-group mb-2">
                                                        <label className="col-md-4 control-label">Pincode:</label>
                                                        <div className="input-group">
                                                            <input name="pincode" placeholder="Pincode" value={pincode} onChange={e => onInputChangeAddress(e)} className="form-control" type="number" required/>
                                                        </div>
                                                    </div>

                                                    <button className='btn btn-outline-custom mx-1 mt-3'>Submit</button>

                                                </form>
                                            </div>
                                            
                                            {addresses?.map((addressTemp, index) => (
                                            <div key={index} className="mb-2 p-3 border border-bottom-dark" style={{ display: isAdding === false ? "block" : "none" }}>
                                                {/* Readonly type when not adding */}
                                                    <div className='font-weight-bold mb-3'>Address: {index+1}</div>
                                                <div className="form-group mb-1">
                                                    <label className="col-md-4 control-label">&nbsp;&nbsp;Street:</label>
                                                    {addressTemp.street}
                                                </div>

                                                <div className="form-group mb-1">
                                                    <label className="col-md-4 control-label">&nbsp;&nbsp;City:</label>
                                                    {addressTemp.city}
                                                </div>

                                                <div className="form-group mb-1">
                                                    <label className="col-md-4 control-label">&nbsp;&nbsp;State:</label>
                                                    {addressTemp.state}
                                                </div>

                                                <div className="form-group mb-2">
                                                    <label className="col-md-4 control-label">&nbsp;&nbsp;Pincode:</label>
                                                    {addressTemp.pincode}
                                                </div>
                                            </div>
                                            ))}

                                        </div>


                                        {/* Continue shopping section */}
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <p className="lead fw-normal mb-0">Continue Shopping?</p>
                                            <p className="mb-0"><Link to="/" className="text-muted">Click Here</Link></p>
                                        </div>

                                        {/* Product photos */}
                                        <div className="row g-2">
                                            {products.slice(0, 4).map((product, index) => (
                                                <Link to={`/productDetails/${product.id}`} key={index} className="col mb-2 border border-light">
                                                    <img src={product.image}
                                                        alt="product-image" className="w-100 rounded-3" />
                                                </Link>
                                            ))}
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
