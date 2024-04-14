import {useState} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';

import apiClient from '../services/apiClient';
import Example from './Example'
 
const Register = (props) => {

    const [name, setName] =  useState('');
    const [email, setEmail] =  useState('');
    const [password, setPassword] =  useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');
    const [role, setRole] = useState(1)
    const [loading, setLoading] = useState(false)


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie')
	    .then(response => {
            setLoading(true)
	        apiClient.post('http://127.0.0.1:8000/register', {
	        	name: name,
	            email: email,
	            password: password,
	            password_confirmation: password_confirmation,
                role: role
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

                                    <div className="row">
                                        <div className="col-md-4 col-form-label text-md-end"> Role: </div>

                                        <div className="col-md-6 d-flex gap-4 align-items-center">
                                            <div className="form-check">
                                              <input className="form-check-input" type="radio" name="account_type" id="recruiter" onChange={(e) => {setRole(e.target.value)}} value="1" checked={role== 1 ? true : false} />
                                              <label className="form-check-label" htmlFor="recruiter">
                                                Recruiter
                                              </label>
                                            </div>

                                            <div className="form-check">
                                              <input className="form-check-input" type="radio" name="account_type" id="job_seeker" onChange={(e) => {setRole(e.target.value)}} value="2" checked={role== 2 ? true : false} />
                                              <label className="form-check-label" htmlFor="job_seeker">
                                                Job Seeker
                                              </label>
                                            </div>
                                        </div>
                                    </div>
                                    

                                    <div className="row mb-0">
                                        <div className="col-md-8 offset-md-4">

                                            <button type="submit" className="btn btn-primary">
                                                {
                                                    !loading ?
                                                    <div>
                                                        Register
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
