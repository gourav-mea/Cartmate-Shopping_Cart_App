import React from 'react';
import './Carousel.css';

export default function Carousel() {
  return (
    <>
          <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
              <div className="carousel-inner">
                  <div className="carousel-item active">
                      <img src="./Deals-pic-1.jpg" className="deal-pic d-block w-100" alt="Deals-Pic-1"/>
                      <img src="./gradient-1.png" className="overlay d-block w-100" alt="gradient-Pic-1" />
                  </div>
                  <div className="carousel-item">
                      <img src="./Deals-pic-2.jpg" className="deal-pic d-block w-100" alt="Deals-Pic-2"/>
                      <img src="./gradient-1.png" className="overlay d-block w-100" alt="gradient-Pic-1" />
                  </div>
                  <div className="carousel-item">
                      <img src="./Deals-pic-3.jpg" className="deal-pic d-block w-100" alt="Deals-Pic-2"/>
                      <img src="./gradient-1.png" className="overlay d-block w-100" alt="gradient-Pic-1" />
                  </div>
              </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
          </div>
          
    </>
  )
}
