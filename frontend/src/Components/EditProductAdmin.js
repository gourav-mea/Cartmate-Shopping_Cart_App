import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from './ContextAPI';

export default function EditProductAdmin() {
    const { userId } = useContext(UserContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setproduct] = useState({
        name: "",
        price: "",
        details: "",
        category: "",
    });

    const { name, price, details, category } = product;
    const onInputChange = e => {
        setproduct({ ...product, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        loadproduct();
    }, []);

    const onSubmit = async e => {
        e.preventDefault();
        await axios.post("http://localhost:8080/products/update", product);
        navigate("/admin/viewproduct");
    };

    const loadproduct = async () => {
        if (userId != 1) {
            navigate("/");
        }else{
            const result = await axios.get(`http://localhost:8080/products/getById/${id}`);
            setproduct(result.data);
        }
    };
    return (
        <div className="container ">
            <div className="row zindex-modal position-relative">
                <div className="col-sm-5 col-offset-3 mx-auto shadow p-5" style={{ background: "rgb(51,0,51,0.9)" }}>
                    <h2 className="text-center mb-4 text-light">Edit A Product</h2>
                    <form onSubmit={e => onSubmit(e)}>
                        <div className="form-group my-2">
                            <input
                                type="text"
                                className="form-control form-control-lg bg-secondary"
                                placeholder="Enter Product Name"
                                name="name"
                                value={name}
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                        <div className="form-group my-2">
                            <input
                                type="text"
                                className="form-control form-control-lg bg-secondary"
                                placeholder="Enter Product Price"
                                name="price"
                                value={price}
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                        <div className="form-group my-2">
                            <input
                                type="text"
                                className="form-control form-control-lg bg-secondary"
                                placeholder="Enter Product details"
                                name="details"
                                value={details}
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                        <div className="form-group my-2">
                            <input
                                type="text"
                                className="form-control form-control-lg bg-secondary"
                                placeholder="Enter Product category"
                                name="category"
                                value={category}
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                        <button className="btn btn-primary btn-block btn-lg my-3">Update Product</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
