import React, { useEffect, useState , useContext} from 'react'
import "./FormComponent.css"
import AOS from "aos";
import "aos/dist/aos.css";
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
import { UserContext } from './ContextAPI';

// Function to check password strength
function getPasswordStrength(password) {
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const digitRegex = /[0-9]/;

    if (password.length < 8) {
        return 'weak';
    } else if (!lowercaseRegex.test(password) || !uppercaseRegex.test(password) || !digitRegex.test(password)) {
        return 'medium';
    } else {
        return 'strong';
    }
}

export default function FormComponent() {
    const {setuserId, userId } = useContext(UserContext);
    const navigate = useNavigate();
    const [isVerified, setisVerified] = useState(false);
    const [EmailFreeze, setEmailFreezed] = useState(false);
    const [click, setClick] = useState(false);
    const [user, setUser] = useState({
        name: "",
        email: "",
        phoneNo: "",
        password: "",
        otpEmailString: "",
    });
    const [login, setlogin] = useState({
        emailLogin: "",
        passwordLogin: "",
    });

    const { name, email, phoneNo, password, otpEmailString } = user;
    const { emailLogin, passwordLogin } = login;

    // handling email verification in signup
    const onClickGetOtp = async e => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/signup/getotp", user);
            alert('Mail Sent');
            setEmailFreezed(true);
        } catch (error) {
            alert('Account with this mail already exits');
            console.log(error)
        }
    }
    const onClickVerify = async e => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/signup/verifyotp", user);
            alert('Mail Verified Successfully');
            setisVerified(true);
            setUser({
                ...user,
                otpEmailString:"",
            });
        } catch (error) {
            alert("Invalid OTP");
            console.log(error)
        }
    }

    // handling signup form
    const onInputChangeSignup = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const onSubmitSignup = async e => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/signup", user);
            alert('SignUp Successfully');
            setUser({
                name: "",
                email: "",
                phoneNo: "",
                password: "",
            });
            setEmailFreezed(false);
            setisVerified(false);
        } catch (error) {
            alert(error);
            console.log(error);
            setEmailFreezed(false);
            setisVerified(false);
        }
    };

    // handling login form 
    const onInputChangeLogin = e => {
        setlogin({ ...login, [e.target.name]: e.target.value });
    };
    const onSubmitLogin = async e => {
        e.preventDefault();
        try {
            const result = await axios.post("http://localhost:8080/login", login);
            setlogin({
                emailLogin: "",
                passwordLogin: "",
            });
            setuserId(result.data);
            if(result != -1){
                alert('Login Successfully');
                navigate("/");
            }
        } catch (error) {
            alert(error);
            console.log(error);
        }
    };

    //  code to check if password is weak or medium or strong
    const passwordStrength = getPasswordStrength(password);
    const passwordClass = `form-control ${passwordStrength === 'weak' ? 'is-invalid' : passwordStrength === 'medium' ? 'is-warning' : 'is-valid'}`;

    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <>
            <div data-aos="flip-right">
                <div id="box">
                    {/* right-box */}
                    <div className="right-box">
                        {/* Sliding-logo */}
                        <div className="text-center sliding-logo">
                            <img src="./CartMate_logo.png" className="img-fluid" alt="..."></img>
                        </div>

                        <div className="text-center right-box-text">
                            <h1>Welcome Back <br /> CartMate!</h1>
                            Don't have an account?
                            <br />
                            <button
                                type="button"
                                className="btn-outline-custom btn mt-3"
                                onClick={() => {
                                    setClick(true);
                                }}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>

                    {/* left-box */}
                    <div className="left-box">
                        <div className="text-center right-box-text">
                            <h1>Welcome to CartMate!</h1>
                            Already have an account?
                            <br />
                            <button
                                type="button"
                                className="btn btn-outline-custom mt-3"
                                onClick={() => {
                                    setClick(false);
                                }}
                            >
                                LogIn
                            </button>
                        </div>
                        {/* <div className='text-center'>
                            <img src="./OnlyName.png" className="img-fluid" style={{ width: "40%" }} alt="CartMate"></img>
                            <img src="./CartMate_logo.png" className="img-fluid" style={{ width: "30%" }} alt="Logo-Cart"></img>
                        </div> */}
                    </div>

                    {/* form - box */}
                    <div className={!click ? "form-box form-box-slide-left" : "form-box-slide-right form-box"}>
                        {click &&
                            <div className="container">
                                <form onSubmit={e => onSubmitSignup(e)}>
                                    <div className="mb-2 mt-2">
                                        <label htmlFor="name" className="form-label m-0">Name</label>
                                        <input type="text" className="form-control" id="name" placeholder="Enter your name" name="name"
                                            value={name}
                                            onChange={e => onInputChangeSignup(e)} required/>
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="email" className="form-label m-0">Email {isVerified ? "(verified)" : ""}</label>
                                        <input type="email" className="form-control mb-1" id="email" placeholder="Enter your email" name="email"
                                            value={email}
                                            onChange={e => onInputChangeSignup(e)} readOnly={EmailFreeze} required/>
                                        <a className='btn btn-outline-custom btn-sm' onClick={onClickGetOtp} style={{display : isVerified? "none": "inline"}}>Get OTP</a>
                                        {(EmailFreeze^isVerified)==true &&
                                            <>
                                            <input type="text" className="form-control mb-1 mt-2" placeholder="Enter OTP Here" name="otpEmailString"
                                                value={otpEmailString}
                                                onChange={e => onInputChangeSignup(e)} required />
                                            <a className='btn btn-outline-custom btn-sm' onClick={onClickVerify} >Verify</a>
                                            </> 
                                        }
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="phone" className="form-label m-0">Phone No.</label>
                                        <input type="tel" className="form-control" id="phone" placeholder="Enter your phone no." name="phoneNo"
                                            value={phoneNo}
                                            onChange={e => onInputChangeSignup(e)} required/>
                                    </div>
                                    <div className="mb-1">
                                        <label htmlFor="password" className="form-label m-0">Password</label>
                                        <input type="password" className={passwordClass} id="password" placeholder="Enter your password" name="password"
                                            value={password}
                                            onChange={e => onInputChangeSignup(e)} required/>
                                        {passwordStrength === 'weak' && <div className="invalid-feedback">Password is too weak</div>}
                                        {passwordStrength === 'medium' && <div className="warning-feedback">Password could be stronger</div>}
                                    </div>
                                    <div className="pt-1 mb-4 text-center">
                                        <button className="btn btn-outline-custom btn-block" type="submit" disabled={!isVerified} >SignUp</button>
                                    </div>
                                </form>
                            </div>
                        }

                        {/* form for login */}
                        {!click &&
                            <div className="container">
                                <form className='p-4' onSubmit={e => onSubmitLogin(e)}>
                                    <div className="d-flex align-items-center mb-3 pb-1">
                                        <div className='text-center'>
                                            <img src="./OnlyName.png" className="img-fluid" style={{ width: "40%" }} alt="CartMate"></img>
                                            <img src="./CartMate_logo.png" className="img-fluid" style={{ width: "30%" }} alt="Logo-Cart"></img>
                                        </div>
                                    </div>

                                    <h4 className="mb-2 pb-2 text-center" style={{ letterSpacing: "1px" }}>Sign into your account</h4>

                                    <div className="form-outline mb-2">
                                        <label className="form-label m-0" htmlFor="form2Example17">Email address</label>
                                        <input type="email" id="form2Example17" className="form-control form-control" name="emailLogin"
                                            value={emailLogin}
                                            onChange={e => onInputChangeLogin(e)} required/>
                                    </div>

                                    <div className="form-outline mb-2">
                                        <label className="form-label m-0" htmlFor="form2Example27">Password</label>
                                        <input type="password" id="form2Example27" className="form-control form-control" name="passwordLogin"
                                            value={passwordLogin}
                                            onChange={e => onInputChangeLogin(e)} required/>
                                    </div>
                                    <Link to="/forgotPassword" aria-current="page">
                                        forgot password?
                                    </Link>
                                    <div className="pt-1 mb-4 text-center">
                                        <button className="btn btn-outline-custom btn-block" type="submit">Login</button>
                                    </div>
                                </form>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
