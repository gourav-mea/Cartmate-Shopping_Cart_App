import "./App.css";
import FormComponent from "./Components/FormComponent";
import Navbar from "./Components/Navbar";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import ForgotPassword from "./Components/ForgotPassword";
import ProductDetails from "./Components/ProductDetails";
import AddProductAdmin from "./Components/AddProductAdmin";
import ViewProductAdmin from "./Components/ViewProductAdmin";
import EditProductAdmin from "./Components/EditProductAdmin";
import CategoryProducts from "./Components/CategoryProducts";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import Cart from "./Components/Cart";
import UserProfile from "./Components/UserProfile";
import ParticlesBackground from "./Components/ParticlesBackground";
import OrderHistory from "./Components/OrderHistory";
import ContextAPI from "./Components/ContextAPI";

function App() {

  return (
    <ContextAPI>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Home/>
          </>
        } />
        <Route path="/login" element={
          <>
            <FormComponent />
          </>
        } />
        <Route path="/forgotPassword" element={
          <>
            <ForgotPassword/>
            <ParticlesBackground />
          </>
        } />
        <Route path="/userProfile" element={ 
          <>
            <UserProfile/>
            <ParticlesBackground />
            <Footer/>
          </>
        } />
        <Route path="/orderHistory" element={
          <>
            <OrderHistory/>
            <ParticlesBackground />
            <Footer />
          </>
        } />
        <Route path="/productDetails/:id" element={
          <>
            <ProductDetails/>
            <Footer />
          </>
        } />
        <Route path="/admin/viewproduct" element={
          <>
            <div className="text-center">
              <Link to="/admin/viewproduct" className="btn btn-outline-success position-relative zindex-modal mt-2" style={{ backgroundColor: "rgb(51,0,51,0.9)" }} end>
                View Product
              </Link>
              <Link to="/admin/addproduct" className="btn btn-outline-success mx-2 mt-2 position-relative zindex-modal" style={{ backgroundColor: "rgb(51,0,51,0.9)" }} >Add Product</Link>
            </div>
            <ViewProductAdmin/>
            <ParticlesBackground />
          </>
        } />
        <Route path="/admin/addproduct" element={
          <>
            <div className="text-center">
              <Link to="/admin/viewproduct" className="btn btn-outline-success position-relative zindex-modal mt-2" style={{ backgroundColor: "rgb(51,0,51,0.9)" }} end>
                View Product
              </Link>
              <Link to="/admin/addproduct" className="btn btn-outline-success mx-2 mt-2 position-relative zindex-modal" style={{ backgroundColor: "rgb(51,0,51,0.9)" }} >Add Product</Link>
            </div>
            <AddProductAdmin/>
            <ParticlesBackground />
          </>
        } />
        <Route path="/admin/editproduct/:id" element={
          <>
            <div className="text-center">
              <Link to="/admin/viewproduct" className="btn btn-outline-success position-relative zindex-modal mt-2" style={{ backgroundColor: "rgb(51,0,51,0.9)" }} end>
                View Product
              </Link>
              <Link to="/admin/addproduct" className="btn btn-outline-success mx-2 mt-2 position-relative zindex-modal" style={{ backgroundColor: "rgb(51,0,51,0.9)" }} >Add Product</Link>
            </div>
            <EditProductAdmin/>
            <ParticlesBackground />
          </>
        } />
        <Route path="/products/category/:category" element={
          <>
            <CategoryProducts/>
            <Footer/>
          </>
        } />
        <Route path="/cart" element={
          <>
            <Cart/>
            <ParticlesBackground />
            <Footer/>
          </>
        } />
      </Routes>
    </Router>
    </ContextAPI>
  );
}

export default App;
