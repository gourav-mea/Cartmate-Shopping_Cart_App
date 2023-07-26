import React, { useEffect } from 'react';
import './CategoryCards.css';
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from 'react-router-dom';

export default function CategoryCards() {
    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <>
            <div className="d-flex" style={{ gap: "4vw", marginLeft: "2vw" }}>
                <div className="card" data-aos="flip-right" data-aos-easing="linear"
                    data-aos-duration="1000" style={{ width: "18rem" }}>
                    <img src="./Clothing-Category-Pic.jpg" className="card-img-top" alt="women-clothing-pic" />
                    <hr style={{ marginTop: "45px" }} />
                    <div className="card-body">
                        <h5 className="card-title" style={{marginTop:"2px"}}>Clothing Items</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <Link to="/products/category/clothing" className="btn btn-outline-custom">See More</Link>
                    </div>
                </div>
                <div className="card" data-aos="zoom-in-right" data-aos-easing="linear"
                    data-aos-duration="1000" style={{ width: "18rem" }}>
                    <img src="./TvAppliances-Pic.jpg" className="card-img-top" alt=".h." />
                    <hr style={{ marginTop: "28px" }} />
                    <div className="card-body">
                        <h5 className="caSearchStringProductrd-title" style={{ marginTop: "2px" }}>Electronics</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <Link to="/products/category/electronics" className="btn btn-outline-custom">See More</Link>
                    </div>
                </div>
                <div className="card" data-aos="zoom-in-left" data-aos-easing="linear"
                    data-aos-duration="1000" style={{ width: "18rem" }}>
                    <img src="./Toys-BabyProducts-Pic.jpg" className="card-img-top" alt="..." />
                    <hr style={{marginTop:"1px"}}/>
                    <div className="card-body">
                        <h5 className="card-title">Toys, Baby Products</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <Link to="/products/category/toys" className="btn btn-outline-custom">See More</Link>
                    </div>
                </div>
                <div className="card" data-aos="flip-left" data-aos-easing="linear"
                    data-aos-duration="1000" style={{ width: "18rem" }}>
                    <img src="./MenFashion-Pic.jpg" className="card-img-top" alt="..." />
                    <hr style={{ marginTop: "1px" }} />
                    <div className="card-body">
                        <h5 className="card-title">Men's Fashion</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <Link to="/products/category/fashion" className="btn btn-outline-custom">See More</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
