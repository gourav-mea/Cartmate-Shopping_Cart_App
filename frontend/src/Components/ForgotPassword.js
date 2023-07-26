import React, { useState } from 'react';
import { Link , useNavigate} from "react-router-dom";
import axios from "axios";

export default function ForgotPassword() {
    const navigate = useNavigate();

    const [login, setlogin] = useState({
        emailLogin: "",
    });
    const [isMailSent, setisMailSent] = useState(false);
    const [user, setUser] = useState({
        resetTokenString : "",
        password : "",
    })

    // Handling sending otp to mail 
    const { emailLogin } = login;
    const onInputChange = e => {
        setlogin({ emailLogin: e.target.value });
    };
    const onSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/forgotPassword", login);
            setlogin({
                emailLogin: "",
            });
            setisMailSent(true);
        } catch (error) {
            alert(error);
            console.log(error);
        }
    };

    // handling verification of otp and setting up new password
    const { password , resetTokenString} = user;
    const onInputChangeSetPassword = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const onSubmitSetPassword = async e => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/resetPassword", user);
            alert('New Password Set Successfully');
            setUser({
                resetTokenString: "",
                password: "",
            });
            navigate("/login");
        } catch (error) {
            alert(error);
            console.log(error)
            setisMailSent(true);
        }
    };

    return (
        <>
            {!isMailSent &&
                <div className="container d-flex flex-column">
                    <div className="row align-items-center justify-content-center
      min-vh-100 g-0">
                        <div className="col-12 col-md-8 col-lg-4" style={{ borderTop: "5px solid #ff8f35", borderRadius: "9px" }}>
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <div className="mb-4">
                                        <h5>Forgot Password?</h5>
                                        <p className="mb-2">Enter your registered email ID to reset the password
                                        </p>
                                    </div>
                                    {/* form to send otp to mail to reset password */}
                                    <form onSubmit={e => onSubmit(e)}>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <input type="email" id="email" className="form-control" name="email" placeholder="Enter Your Email"
                                                required="" value={emailLogin}
                                                onChange={e => onInputChange(e)} />
                                        </div>
                                        <div className="mb-3 d-grid">
                                            <button type="submit" className="btn btn-outline-custom">
                                                Send Reset Token
                                            </button>
                                        </div>
                                        <span>Don't have an account? <Link to="/login">sign in</Link></span>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {isMailSent &&
                <div className="container d-flex flex-column">
                    <div className="row align-items-center justify-content-center
      min-vh-100 g-0">
                        <div className="col-12 col-md-8 col-lg-4 p-1" style={{ borderTop: "5px solid #ff8f35", borderRadius: "9px" }}>
                            <div className="position-relative">
                                <div className="card p-2 text-center">
                                    <h6>Please enter the one time password <br /> to reset your password</h6>
                                    <div>
                                        <span>A code has been sent to your email</span>
                                    </div>

                                    {/* form to handle reset passord */}
                                    <form className='p-2' onSubmit={e => onSubmitSetPassword(e)}>
                                        <div id="otp" className="inputs d-flex flex-row justify-content-center mt-2 mb-3">
                                            <input type="text" id="form2Example27" className="form-control form-control" placeholder='Enter OTP Here'
                                                name="resetTokenString" value={resetTokenString}
                                                onChange={e => onInputChangeSetPassword(e)} required />
                                        </div>
                                        <div className="form-outline mb-2">
                                            <label className="form-label m-0" htmlFor="form2Example27">Enter New Password:</label>
                                            <input type="password" id="form2Example27" className="form-control form-control" placeholder='Enter New Password Here'
                                                name = "password" value={password}
                                                onChange={e => onInputChangeSetPassword(e)} required/>
                                        </div>
                                        <div className="mt-4">
                                            <button className="btn btn-outline-custom px-4" type="submit">Set New Password</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
