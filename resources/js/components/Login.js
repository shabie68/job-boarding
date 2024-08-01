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

        <div className="bg-one h-100vh">
            <div className="container pt-4">
                <div className="row justify-content-center w-75 m-auto">
                    <div className="col-md-6">
                        <div className="bj-border bj-border-radius p-3">
                            <div className="bg-one">
                                Login
                            </div>

                            <div className="card-body bg-one">
                                <form onSubmit={handleSubmit}>
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
                                            <button type="submit" className="btn bg-two text-prime w-100">
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
                                        <a href="/register">Register</a>
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
