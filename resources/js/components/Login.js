import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';

import apiClient from '../services/apiClient';
import Example from './Example'

 
const Login = (props) => {

    const [loading, setLoading] = React.useState(false);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = (e) => {
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
	    });
    }
    return (

        <div className="bj-gradient h-100vh">
            <div className="container pt-4 text-two">
                
                <div className="">
                        
                    <div className="bj-margin-auto bj-w-45">
                        <h3 className="text-center my-4 text-prime">Welcome back! Login to continue your journey</h3>
                        <h3 className="text-center mb-4 text-prime">Let's Amplify your growth with us!</h3>
                        <div className="">

                            <div className="card-body bg-one bj-border bj-border-radius">
                                <form onSubmit={handleSubmit} className="p-3">
                                    <div className="row mb-3">
                                        <label htmlFor="email" className="col-form-label"></label>
                                        <div className="col-md-12">
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Email"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                required
                                                className="bj-input bg-one"
                                            />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="email" className="col-form-label"></label>
                                        <div className="col-md-12">
                                            <input
                                                type="password"
                                                name="password"
                                                placeholder="Password"
                                                value={password}
                                                onChange={e => setPassword(e.target.value)}
                                                required
                                                className="bj-input bg-one"
                                            />
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
                                                        <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                                        Loading...
                                                    </div>
                                                }
                                            </button>
                                        </div>
                                    </div>

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
