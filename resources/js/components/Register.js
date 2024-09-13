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

        <div className="bj-gradient h-100 py-4">
            <div className="container">
                <div className="bj-m-32-auto bj-w-45">
                    <h3 className="text-center text-prime">Create an account</h3>

                    
                    <div className="">
                        <div className="bj-border bj-border-radius p-3 bg-one">

                            <div className="">
                                <form onSubmit={handleSubmit}>

                                	<div className="row mb-3">
                                        <strong><label htmlFor="name" className="text-md-end">Name</label></strong>
                                        <div className="col-md-12">
                                            <input
                                                type="text"
                                                name="name"
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                                required
                                                className="bj-input bg-one"
                                            />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <strong><label htmlFor="email" className="text-md-end">Email</label></strong>
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

                                    <div className="row mb-3">
                                        <strong><label htmlFor="email" className="text-md-end">Password</label></strong>
                                        <div className="col-md-12">
                                            <input
                                                type="password"
                                                name="password"
                                                value={password}
                                                onChange={e => setPassword(e.target.value)}
                                                required
                                                className="bj-input bg-one"
                                                required
                                                autoComplete="new-password"
                                            />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
			                            <strong><label htmlFor="password-confirm" className="text-md-end">Confirm Password</label></strong>

			                            <div className="col-md-12">
			                                <input 
			                                	type="password"
                                                value={password_confirmation}
                                                onChange={e => setPasswordConfirmation(e.target.value)}
                                                required
                                                className="bj-input bg-one"
			                               		name="password_confirmation" 
			                               		required 
			                               		autoComplete="new-password" />
			                            </div>
			                        </div>


                                    <div className=" bj-role">
                                        <strong> Role </strong>

                                        <div className="col-md-11 d-flex gap-4 align-items-center">
                                            <div className="form-check">
                                              <input className="form-check-input" type="radio" name="account_type" id="recruiter" onChange={(e) => {setRole(e.target.value)}} value="1" checked={role== 1 ? true : false} />
                                              <label htmlFor="recruiter">
                                                Recruiter
                                              </label>
                                            </div>

                                            <div className="form-check">
                                              <input className="form-check-input" type="radio" name="account_type" id="job_seeker" onChange={(e) => {setRole(e.target.value)}} value="2" checked={role== 2 ? true : false} />
                                              <label htmlFor="job_seeker">
                                                Job Seeker
                                              </label>
                                            </div>
                                        </div>
                                    </div>
                                    

                                    <div className="row mb-0">
                                        <div className="col-md-12">

                                            <button type="submit" className="btn bj-btn-prime text-prime w-100">
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

                                    <p className="bj-font-12">By clicking "Register," you agree to our Terms of Use and our Privacy Policy.</p>
                                    <div className="d-flex align-items-center mb-2">
                                        <span className="bj-w-40 bg-3" ></span>
                                        <span className="bj-w-20 text-center">Or</span>
                                        <span className="bj-w-40 bg-3"></span>
                                    </div>

                                    <div className="d-flex justify-content-center gap-2">
                                        <span>Already have an account?</span>
                                        <a className="bj-text-secondary" href="/login">Login</a>
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
