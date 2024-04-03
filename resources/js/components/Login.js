import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';

import apiClient from '../services/apiClient';
import Example from './Example'
 
const Login = (props) => {
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie')
	    .then(response => {
	        apiClient.post('http://127.0.0.1:8000/login', {
	            email: email,
	            password: password
	        }).then(response => {
                if(response.status===204) {
                    console.log("REQEST")
                    console.log(response)
                    setLoggedIn(true)    
                }
	        	
	        })
	    });
    }
    return (

        <div>
            {
            !loggedIn ?
                <div className="container pt-4">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">
                                    Login
                                </div>

                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row mb-3">
                                            <label for="email" class="col-md-4 col-form-label text-md-end">Email Address</label>
                                            <div className="col-md-6">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder="Email"
                                                    value={email}
                                                    onChange={e => setEmail(e.target.value)}
                                                    required
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>

                                        <div className="row mb-3">
                                            <label for="email" class="col-md-4 col-form-label text-md-end">Password</label>
                                            <div className="col-md-6">
                                                <input
                                                    type="password"
                                                    name="password"
                                                    placeholder="Password"
                                                    value={password}
                                                    onChange={e => setPassword(e.target.value)}
                                                    required
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>

                                        <div class="row mb-0">
                                            <div class="col-md-8 offset-md-4">
                                                <button type="submit" className="btn btn-primary">Login</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            :
                window.location = '/home'

    }
        </div>
    
        
    );
}
 
export default Login;
