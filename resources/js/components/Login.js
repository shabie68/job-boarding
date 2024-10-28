import {useState, useEffect} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';

import apiClient from '../services/apiClient';
import Example from './Example'

 
const Login = (props) => {

    const [loading, setLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState(false)

    const handleSubmit = (e) => {
        setError(false)
        setLoading(true)
        e.preventDefault();
        axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie')
	    .then(response => {
	        apiClient.post('http://127.0.0.1:8000/login', {
	            email: email,
	            password: password
	        })
            .then(response => {
                if(response.status===204) {
                   window.location = '/home'
                }	
	        })
            .catch((err) => {
                setError(true)  
            })
	    });
    }

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword)
        document.querySelector('input[name="password"]').type = showPassword ? 'password' : 'text'
    }

    const addBackgroundGradient = () => {
        document.querySelector('body').classList.add('bj-gradient')
    }

    useEffect(() => {
        addBackgroundGradient()
    }, [])
    
    return (

        <div className="bj-gradient py-4 h-100">
            <div className="container text-two">
                
                <div className="">
                        
                    <div className="bj-margin-auto bj-card-w">
                        <h3 className="text-center my-4 text-prime">Welcome back! Login to continue your journey</h3>
                        <h3 className="text-center mb-4 text-prime">Let's Amplify your growth with us!</h3>
                        <div className="">

                            <div className="card-body bg-one bj-border bj-border-radius">
                                <form onSubmit={handleSubmit} className="p-3">
                                    <div className="row mb-3">
                                        <strong><label htmlFor="email">Email</label></strong>
                                        <div className="col-md-12">
                                            <input
                                                type="email"
                                                name="email"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                required
                                                className="bj-input bg-one"
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <strong><label htmlFor="password">Password</label></strong>
                                        <div className="position-relative">
                                            <input
                                                type="password"
                                                name="password"
                                                value={password}
                                                onChange={e => setPassword(e.target.value)}
                                                required
                                                className="bj-input bg-one"
                                            />

                                            <span onClick={handlePasswordVisibility} className="bj-cursor-pointer">

                                                {
                                                    showPassword 
                                                    ?
                                                    <span className="position-absolute bj-right-15 bj-top-10">
                                                        <svg width="20" height="20" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M876.8 156.8c0-9.6-3.2-16-9.6-22.4-6.4-6.4-12.8-9.6-22.4-9.6-9.6 0-16 3.2-22.4 9.6L736 220.8c-64-32-137.6-51.2-224-60.8-160 16-288 73.6-377.6 176C44.8 438.4 0 496 0 512s48 73.6 134.4 176c22.4 25.6 44.8 48 73.6 67.2l-86.4 89.6c-6.4 6.4-9.6 12.8-9.6 22.4 0 9.6 3.2 16 9.6 22.4 6.4 6.4 12.8 9.6 22.4 9.6 9.6 0 16-3.2 22.4-9.6l704-710.4c3.2-6.4 6.4-12.8 6.4-22.4Zm-646.4 528c-76.8-70.4-128-128-153.6-172.8 28.8-48 80-105.6 153.6-172.8C304 272 400 230.4 512 224c64 3.2 124.8 19.2 176 44.8l-54.4 54.4C598.4 300.8 560 288 512 288c-64 0-115.2 22.4-160 64s-64 96-64 160c0 48 12.8 89.6 35.2 124.8L256 707.2c-9.6-6.4-19.2-16-25.6-22.4Zm140.8-96c-12.8-22.4-19.2-48-19.2-76.8 0-44.8 16-83.2 48-112 32-28.8 67.2-48 112-48 28.8 0 54.4 6.4 73.6 19.2L371.2 588.8ZM889.599 336c-12.8-16-28.8-28.8-41.6-41.6l-48 48c73.6 67.2 124.8 124.8 150.4 169.6-28.8 48-80 105.6-153.6 172.8-73.6 67.2-172.8 108.8-284.8 115.2-51.2-3.2-99.2-12.8-140.8-28.8l-48 48c57.6 22.4 118.4 38.4 188.8 44.8 160-16 288-73.6 377.6-176C979.199 585.6 1024 528 1024 512s-48.001-73.6-134.401-176Z" fill="#000000"></path><path d="M511.998 672c-12.8 0-25.6-3.2-38.4-6.4l-51.2 51.2c28.8 12.8 57.6 19.2 89.6 19.2 64 0 115.2-22.4 160-64 41.6-41.6 64-96 64-160 0-32-6.4-64-19.2-89.6l-51.2 51.2c3.2 12.8 6.4 25.6 6.4 38.4 0 44.8-16 83.2-48 112-32 28.8-67.2 48-112 48Z" fill="#000000"></path></g></svg>
                                                    </span>
                                                    :
                                                    <span className="position-absolute bj-right-15 bj-top-10">
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <circle cx="12" cy="12" r="3" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></circle> </g></svg>
                                                    </span> 
                                                    
                                                }
                                            </span>
                                        </div>
                                    </div>

                                    <div className="row my-2">
                                        <div className="">
                                            <button type="submit" className="bj-btn btn-prime bj-btn-prime text-prime w-100">
                                                {
                                                    !loading ?
                                                    <div>
                                                        Login
                                                    </div>
                                                    :
                                                    <div>
                                                        <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                                        Loading...
                                                    </div>
                                                }
                                            </button>
                                        </div>
                                    </div>
                                    {
                                      error ?
                                      <div className="text-danger d-flex align-items-center gorgeous-gap-8">
                                        <span>
                                            <svg viewBox="0 0 16 16" fill="none" width="16" height="16" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M7.493 0.015 C 7.442 0.021,7.268 0.039,7.107 0.055 C 5.234 0.242,3.347 1.208,2.071 2.634 C 0.660 4.211,-0.057 6.168,0.009 8.253 C 0.124 11.854,2.599 14.903,6.110 15.771 C 8.169 16.280,10.433 15.917,12.227 14.791 C 14.017 13.666,15.270 11.933,15.771 9.887 C 15.943 9.186,15.983 8.829,15.983 8.000 C 15.983 7.171,15.943 6.814,15.771 6.113 C 14.979 2.878,12.315 0.498,9.000 0.064 C 8.716 0.027,7.683 -0.006,7.493 0.015 M8.853 1.563 C 9.967 1.707,11.010 2.136,11.944 2.834 C 12.273 3.080,12.920 3.727,13.166 4.056 C 13.727 4.807,14.142 5.690,14.330 6.535 C 14.544 7.500,14.544 8.500,14.330 9.465 C 13.916 11.326,12.605 12.978,10.867 13.828 C 10.239 14.135,9.591 14.336,8.880 14.444 C 8.456 14.509,7.544 14.509,7.120 14.444 C 5.172 14.148,3.528 13.085,2.493 11.451 C 2.279 11.114,1.999 10.526,1.859 10.119 C 1.618 9.422,1.514 8.781,1.514 8.000 C 1.514 6.961,1.715 6.075,2.160 5.160 C 2.500 4.462,2.846 3.980,3.413 3.413 C 3.980 2.846,4.462 2.500,5.160 2.160 C 6.313 1.599,7.567 1.397,8.853 1.563 M7.706 4.290 C 7.482 4.363,7.355 4.491,7.293 4.705 C 7.257 4.827,7.253 5.106,7.259 6.816 C 7.267 8.786,7.267 8.787,7.325 8.896 C 7.398 9.033,7.538 9.157,7.671 9.204 C 7.803 9.250,8.197 9.250,8.329 9.204 C 8.462 9.157,8.602 9.033,8.675 8.896 C 8.733 8.787,8.733 8.786,8.741 6.816 C 8.749 4.664,8.749 4.662,8.596 4.481 C 8.472 4.333,8.339 4.284,8.040 4.276 C 7.893 4.272,7.743 4.278,7.706 4.290 M7.786 10.530 C 7.597 10.592,7.410 10.753,7.319 10.932 C 7.249 11.072,7.237 11.325,7.294 11.495 C 7.388 11.780,7.697 12.000,8.000 12.000 C 8.303 12.000,8.612 11.780,8.706 11.495 C 8.763 11.325,8.751 11.072,8.681 10.932 C 8.616 10.804,8.460 10.646,8.333 10.580 C 8.217 10.520,7.904 10.491,7.786 10.530 " stroke="none" fillrule="evenodd" fill="#dc3545"></path></g></svg>
                                        </span>
                                        <span>
                                            Error while login! Please check password and email
                                        </span>
                                      </div>
                                      :''
                                    }

                                    <p className="bj-font-12">By clicking "Sign in," you agree to our Terms of Use and our Privacy Policy.</p>

                                    <div className="d-flex align-items-center mb-2">
                                        <span className="bj-w-40 bg-3" ></span>
                                        <span className="bj-w-20 text-center">Or</span>
                                        <span className="bj-w-40 bg-3"></span>
                                    </div>

                                    <div className="d-flex justify-content-center gap-2">
                                        <span>Don't have an account?</span>
                                        <a className="bj-text-secondary" href="/register">Register</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    
        
    );
}
 
export default Login;
