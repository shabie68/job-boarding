import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';

import apiClient from '../services/apiClient';
import Example from './Example'
 
const Register = (props) => {

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [password_confirmation, setPasswordConfirmation] = React.useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie')
	    .then(response => {
	        apiClient.post('http://127.0.0.1:8000/register', {
	        	name: name,
	            email: email,
	            password: password,
	            password_confirmation: password_confirmation
	        }).then(response => {
                if(response.status===201) {  
                    window.location = '/home'
                }
	  
	        })
	    });
    }
    return (

        <div>
            <div className="container pt-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">
                                Register
                            </div>

                            <div className="card-body">
                                <form onSubmit={handleSubmit}>

                                	<div className="row mb-3">
                                        <label htmlFor="name" className="col-md-4 col-form-label text-md-end">Name</label>
                                        <div className="col-md-6">
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Name"
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                                required
                                                className="form-control"
                                            />
                                        </div>
                                    </div>


                                    <div className="row mb-3">
                                        <label htmlFor="email" className="col-md-4 col-form-label text-md-end">Email Address</label>
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
                                        <label htmlFor="email" className="col-md-4 col-form-label text-md-end">Password</label>
                                        <div className="col-md-6">
                                            <input
                                                type="password"
                                                name="password"
                                                placeholder="Password"
                                                value={password}
                                                onChange={e => setPassword(e.target.value)}
                                                required
                                                className="form-control"
                                                required
                                                autoComplete="new-password"
                                            />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
			                            <label htmlFor="password-confirm" className="col-md-4 col-form-label text-md-end">Confirm Password</label>

			                            <div className="col-md-6">
			                                <input 
			                                	type="password"
                                                placeholder="Confirm Password"
                                                value={password_confirmation}
                                                onChange={e => setPasswordConfirmation(e.target.value)}
                                                required
                                                className="form-control"
                                           
			                               		name="password_confirmation" 
			                               		required 
			                               		autoComplete="new-password" />
			                            </div>
			                        </div>

                                    <div className="row mb-0">
                                        <div className="col-md-8 offset-md-4">
                                            <button type="submit" className="btn btn-primary">Register</button>
                                        </div>
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
 
export default Register;
