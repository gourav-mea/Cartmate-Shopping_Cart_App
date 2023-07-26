import React,{useState, useContext, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './ContextAPI';

export default function Navbar() {
  const { userId, setuserId } = useContext(UserContext);
  const navigate = useNavigate();
  const [searchString, setSearchString] = useState();
  const [cartLength, setCartLength] = useState();

  useEffect(() => {
    loadnavbar();
  });
  const loadnavbar = async () => {
    const result = await axios.get(`http://localhost:8080/cart/${userId}/getCart`);
    setCartLength(result.data.length);
  };

  const handleSearchClick = async e=>{
    e.preventDefault();
    try {
      const result = await axios.get(`http://localhost:8080/products/search/${searchString}`);
      const products = result.data;
      if(products.length !== 0){
        const category = products[0].category;
        navigate(`/products/category/${category}`);
      }
      else{
        alert("No such string found in category search");
      }
    } catch (error) {
      alert("No such string found in category search");
    }
  }
  const handleLogout = async() => {
    try {
      // await axios.post("http://localhost:8080/logout",result.data);
      setuserId(-1);
      alert("Logout Successfully");
      navigate("/");
    } 
    catch (error) {
      alert("cannot logout, see console");
      console.log(error);
    }
  }

  return (
    <div className='zindex-modal position-relative'>
      <nav
        className="navbar navbar-expand-lg  navbar-dark "
        style={{ backgroundColor: "rgb(38, 0, 38,0.8)" }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            CartMate
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page">
                  Home
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle active"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/products/category/clothing" className="dropdown-item">
                      Clothing Items
                    </Link>
                  </li>
                  <li>
                    <Link to="/products/category/fashion" className="dropdown-item">
                      Men's Fashion
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link to="/products/category/electronics" className="dropdown-item">
                      Tv, Appliances, Electronics
                    </Link>
                  </li>
                  <li>
                    <Link to="/products/category/toys" className="dropdown-item">
                      Toys, Baby Products
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link to="/userProfile" className="nav-link active">
                  Add Address
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/orderHistory" className="nav-link active">
                  Order History
                </Link>
              </li>
              <li className="nav-item">
                {userId == 1? 
                  <Link to="/admin/viewproduct" className="nav-link active">Add Product</Link>
                  :
                  <></>
                }
              </li>
            </ul>
            <form className="d-flex me-auto" onSubmit={e => handleSearchClick(e)} >
              <input
                className="form-control me-2"
                value={searchString}
                onChange={(e)=>{setSearchString(e.target.value)}}
                type="search"
                placeholder="Search By Category String"
                aria-label="Search By Category String"
                required
              />
              <button type='submit'  className="btn btn-outline-success" >
                Search
              </button>
            </form>
          </div>
          
          <div style={{ position: "relative", width:"4.5%" }}>
            <Link to="/cart" className='position-relative d-inline-block' >
              <img src="/CartMate_logo.png" className="img-fluid " style={{ width: "80%" }} alt="Deals-Pic-2" />
              <span className="badge text-bg-light position-absolute top-0 end-0 mx-1 my-0">{cartLength}</span>
            </Link>
          </div>

          <div style={{ position: "relative", width: "4.5%" }}>
            <Link to="/userProfile" className='position-relative d-inline-block'>
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                alt="(Your Profile)" className="img-fluid border border-light"
                style={{
                  width: "65%",
                  borderRadius: "50%",
                  transition: "transform 0.2s",
                  ":hover": { transform: "scale(0.9)" },
                }} />
            </Link>
          </div>
          {userId != -1 && userId != 'undefined' ? 
            <button onClick={handleLogout} className="btn btn-outline-success">
              Logout
            </button>
          :
          <Link to="/login" className="btn btn-outline-success">
            Login/Signup
          </Link>
          }
          
        </div>
      </nav>
    </div>
  );
}
