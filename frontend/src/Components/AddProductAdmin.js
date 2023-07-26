import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { UserContext } from './ContextAPI';

export default function AddProductAdmin() {
    const { userId } = useContext(UserContext);
    const navigate = useNavigate();
    const [product, setproduct] = useState({
        name: "",
        price: "",
        details: "",
        category: "",
        image: "",
    });
    useEffect(() => {
        loadpage();
    }, []);
    const loadpage = async () => {
        if (userId != 1) {
            navigate("/");
        }
    };
    const { name, price, details, category} = product;

    const onInputChange = e => {
        setproduct({ ...product, [e.target.name]: e.target.value });
    };
    const handleImageChange = async (event) => {
        const choosedFile = event.target.files[0];

        if (choosedFile) {
            const reader = new FileReader();
            reader.readAsDataURL(choosedFile)
            reader.onload = () => {
                setproduct({ ...product, image: reader.result })
            }
        }
    };


    const onSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/products/addProduct", product);
            alert('Data Inserted');
            setproduct({
                name: "",
                price: "",
                details: "",
                category: "",
                image: "",
            });
        } catch (error) {
            console.log(error);
        }
    };
    return (

        <div className="container">
            <div className="row zindex-modal position-relative">
                <div className="col-sm-4 mx-auto shadow p-5" style={{ background: "rgb(51,0,51,0.9)" }}>
                    <h2 className="text-center mb-4 text-light">Add A Product</h2>
                    <form onSubmit={e => onSubmit(e)}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control form-control-lg my-2 bg-dark text-light"
                                placeholder="Enter Product Name"
                                name="name"
                                value={name}
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control form-control-lg my-2 bg-dark text-light"
                                placeholder="Enter Product Price"
                                name="price"
                                value={price}
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <textarea
                                type="text"
                                row="4"
                                className="form-control form-control-lg my-2 bg-dark text-light"
                                placeholder="Enter Product details"
                                name="details"
                                value={details}
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control form-control-lg my-2 bg-dark text-light"
                                placeholder="Enter Product category"
                                name="category"
                                value={category}
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input className="form-control form-control-lg my-2 bg-dark text-light" type="file" onChange={handleImageChange} />

                        </div>

                        <button className="btn btn-primary btn-block btn-lg my-3" type="submit">Add Product</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
