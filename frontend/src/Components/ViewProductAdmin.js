import React, {useState, useEffect, useContext} from 'react'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.css'; // import the CSS file
import '@fortawesome/fontawesome-free/js/all.js'; // import the JS file
import { UserContext } from './ContextAPI';

export default function ViewProductAdmin() {
    const { userId } = useContext(UserContext);
    const navigate = useNavigate();
    const [products, setproduct] = useState([]);

    useEffect(() => {
        loadproducts();
    }, []);

    const loadproducts = async () => {
        if (userId != 1) {
            navigate("/");
        }else{
            const result = await axios.get("http://localhost:8080/products");
            setproduct(result.data.reverse());
        }
    };

    const deleteproduct = (productId) => {
        axios.delete(`http://localhost:8080/products/delete/${productId}`)
            .then((result) => {
                loadproducts();
            })
            .catch((error) => {
                console.log(error)
                alert('Error in the Code');
            });
    };
    return (
        <div className="container ">
            <div className="py-4 zindex-modal position-relative text-light" style={{ background: "rgb(51,0,51,0.9)" }}>
                <h3 className="mb-3 text-center text-light">Product Details</h3>
                <table className="table border shadow table-bordered">
                    <thead className="thead-primary text-light">
                        <tr>
                            <th scope="col" className='text-center' >Serial No</th>
                            <th scope="col" className='text-center' >Product Name</th>
                            <th scope="col" className='text-center' >Product Price</th>
                            <th scope="col" className='text-center' >Product Description</th>
                            <th scope="col" className='text-center' >Product Category</th>
                            <th scope="col" className='text-center' >Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr class="text-light">
                                <th scope="row">{index + 1}</th>
                                <td className='text-center text-justify'>{product.name}</td>
                                <td className='text-center text-justify'>₹{product.price}</td>
                                <td className='text-center text-justify'>{product.details}</td>
                                <td className='text-center text-justify'>{product.category}</td>
                                <td className='text-center text-justify'><img src={product.image} alt="productImage" className='w-100' /></td>
                                <td className='text-center text-justify'>
                                    <Link className=" mx-2 my-2" to={`/admin/editproduct/${product.id}`}>
                                        <i className="fa fa-edit" aria-hidden="true"></i>
                                    </Link>
                                    <a className="" onClick={() => deleteproduct(product.id)}>
                                        <i className="fa fa-trash" aria-hidden="true"></i>
                                    </a>
                                </td>
                            </tr>
                            
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
