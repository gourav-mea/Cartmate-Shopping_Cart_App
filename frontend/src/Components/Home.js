import React, {useState, useEffect, useContext} from 'react'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import Carousel from './Carousel';
import Footer from './Footer';
import CategoryCards from './CategoryCards';
import { UserContext } from './ContextAPI';

export default function Home() {
    const { userId } = useContext(UserContext);
    const navigate = useNavigate();
    const [products, setproduct] = useState([]);
    const [productsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchString, setSearchString] = useState();

    useEffect(() => {
        loadproducts();
    }, []);

    const loadproducts = async () => {
        const result = await axios.get("http://localhost:8080/products");
        setproduct(result.data.map(product => ({ ...product, isLoading: false})));
    };

    // function to handle page change 
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const handleSearchClick = async e => {
        e.preventDefault();
        try {
            const result = await axios.get(`http://localhost:8080/products/search/${searchString}`);
            setproduct(result.data);
        } catch (error) {
            alert("No such string found in category search");
        }
    }

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
        } else {
            alert("You need to be logged in to add product in cart")
            navigate("/login");
        }
    };


  return (
    <div>
        <div className="carousel-container" style={{marginBottom:"28vh"}}>
              <Carousel />
              <div className="home-page-cards-container">
                  <CategoryCards />
              </div>
        </div>
        <div className="text-center my-1 text-light">
            <h4>Product List</h4>
        </div>
          <form className="d-flex container" onSubmit={e => handleSearchClick(e)} >
              <input
                  className="form-control me-2"
                  value={searchString}
                  onChange={(e) => { setSearchString(e.target.value) }}
                  type="search"
                  placeholder="Search Product"
                  aria-label="Search Product"
                  required
              />
              <button type='submit' className="btn btn-outline-success" >
                  Search
              </button>
          </form>
        {/* Product Card */}
          {products
              .slice(currentPage * productsPerPage, (currentPage + 1) * productsPerPage)
              .map((product, index) => (
            <div data-aos={(index+1)%2==0 ?"fade-up-right" : "fade-up-left"}>
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
          <ReactPaginate
              previousLabel={'previous'}
              nextLabel={'next'}
              breakLabel={'...'}
              pageCount={Math.ceil(products.length / productsPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}

              
              containerClassName="pagination justify-content-center"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              activeClassName="active"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakClassName="page-item"
              breakLinkClassName="page-link"
          />

        <Footer />
    </div>
  )
}
