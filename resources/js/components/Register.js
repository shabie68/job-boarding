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
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword)
        document.querySelector('input[name="password"]').type = showPassword ? 'password' : 'text'
    }

    const handleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword)
        document.querySelector('input[name="password_confirmation"]').type = showConfirmPassword ? 'password' : 'text'
    }

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

                                    <div className="mb-3">
                                        <strong><label htmlFor="email" className="text-md-end">Password</label></strong>
                                        <div className="position-relative">
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

                                            <span onClick={handlePasswordVisibility} className="bj-cursor-pointer">

                                                {
                                                    showPassword 
                                                    ?
                                                    <span className="position-absolute bj-right-15 bj-top-10">
                                                        <svg width="20" height="20" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M876.8 156.8c0-9.6-3.2-16-9.6-22.4-6.4-6.4-12.8-9.6-22.4-9.6-9.6 0-16 3.2-22.4 9.6L736 220.8c-64-32-137.6-51.2-224-60.8-160 16-288 73.6-377.6 176C44.8 438.4 0 496 0 512s48 73.6 134.4 176c22.4 25.6 44.8 48 73.6 67.2l-86.4 89.6c-6.4 6.4-9.6 12.8-9.6 22.4 0 9.6 3.2 16 9.6 22.4 6.4 6.4 12.8 9.6 22.4 9.6 9.6 0 16-3.2 22.4-9.6l704-710.4c3.2-6.4 6.4-12.8 6.4-22.4Zm-646.4 528c-76.8-70.4-128-128-153.6-172.8 28.8-48 80-105.6 153.6-172.8C304 272 400 230.4 512 224c64 3.2 124.8 19.2 176 44.8l-54.4 54.4C598.4 300.8 560 288 512 288c-64 0-115.2 22.4-160 64s-64 96-64 160c0 48 12.8 89.6 35.2 124.8L256 707.2c-9.6-6.4-19.2-16-25.6-22.4Zm140.8-96c-12.8-22.4-19.2-48-19.2-76.8 0-44.8 16-83.2 48-112 32-28.8 67.2-48 112-48 28.8 0 54.4 6.4 73.6 19.2L371.2 588.8ZM889.599 336c-12.8-16-28.8-28.8-41.6-41.6l-48 48c73.6 67.2 124.8 124.8 150.4 169.6-28.8 48-80 105.6-153.6 172.8-73.6 67.2-172.8 108.8-284.8 115.2-51.2-3.2-99.2-12.8-140.8-28.8l-48 48c57.6 22.4 118.4 38.4 188.8 44.8 160-16 288-73.6 377.6-176C979.199 585.6 1024 528 1024 512s-48.001-73.6-134.401-176Z" fill="#000000"></path><path d="M511.998 672c-12.8 0-25.6-3.2-38.4-6.4l-51.2 51.2c28.8 12.8 57.6 19.2 89.6 19.2 64 0 115.2-22.4 160-64 41.6-41.6 64-96 64-160 0-32-6.4-64-19.2-89.6l-51.2 51.2c3.2 12.8 6.4 25.6 6.4 38.4 0 44.8-16 83.2-48 112-32 28.8-67.2 48-112 48Z" fill="#000000"></path></g></svg>
                                                    </span>
                                                    :
                                                    <span className="position-absolute bj-right-15 bj-top-10">
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <circle cx="12" cy="12" r="3" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></circle> </g></svg>
                                                    </span> 
                                                    
                                                }
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mb-3">
			                            <strong><label htmlFor="password-confirm" className="text-md-end">Confirm Password</label></strong>

			                            <div className="position-relative">
			                                <input 
			                                	type="password"
                                                value={password_confirmation}
                                                onChange={e => setPasswordConfirmation(e.target.value)}
                                                required
                                                className="bj-input bg-one"
			                               		name="password_confirmation" 
			                               		required 
			                               		autoComplete="new-password" />

                                            <span onClick={handleConfirmPasswordVisibility} className="bj-cursor-pointer">

                                                {
                                                    showConfirmPassword 
                                                    ?
                                                    <span className="position-absolute bj-right-15 bj-top-10">
                                                        <svg width="20" height="20" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M876.8 156.8c0-9.6-3.2-16-9.6-22.4-6.4-6.4-12.8-9.6-22.4-9.6-9.6 0-16 3.2-22.4 9.6L736 220.8c-64-32-137.6-51.2-224-60.8-160 16-288 73.6-377.6 176C44.8 438.4 0 496 0 512s48 73.6 134.4 176c22.4 25.6 44.8 48 73.6 67.2l-86.4 89.6c-6.4 6.4-9.6 12.8-9.6 22.4 0 9.6 3.2 16 9.6 22.4 6.4 6.4 12.8 9.6 22.4 9.6 9.6 0 16-3.2 22.4-9.6l704-710.4c3.2-6.4 6.4-12.8 6.4-22.4Zm-646.4 528c-76.8-70.4-128-128-153.6-172.8 28.8-48 80-105.6 153.6-172.8C304 272 400 230.4 512 224c64 3.2 124.8 19.2 176 44.8l-54.4 54.4C598.4 300.8 560 288 512 288c-64 0-115.2 22.4-160 64s-64 96-64 160c0 48 12.8 89.6 35.2 124.8L256 707.2c-9.6-6.4-19.2-16-25.6-22.4Zm140.8-96c-12.8-22.4-19.2-48-19.2-76.8 0-44.8 16-83.2 48-112 32-28.8 67.2-48 112-48 28.8 0 54.4 6.4 73.6 19.2L371.2 588.8ZM889.599 336c-12.8-16-28.8-28.8-41.6-41.6l-48 48c73.6 67.2 124.8 124.8 150.4 169.6-28.8 48-80 105.6-153.6 172.8-73.6 67.2-172.8 108.8-284.8 115.2-51.2-3.2-99.2-12.8-140.8-28.8l-48 48c57.6 22.4 118.4 38.4 188.8 44.8 160-16 288-73.6 377.6-176C979.199 585.6 1024 528 1024 512s-48.001-73.6-134.401-176Z" fill="#000000"></path><path d="M511.998 672c-12.8 0-25.6-3.2-38.4-6.4l-51.2 51.2c28.8 12.8 57.6 19.2 89.6 19.2 64 0 115.2-22.4 160-64 41.6-41.6 64-96 64-160 0-32-6.4-64-19.2-89.6l-51.2 51.2c3.2 12.8 6.4 25.6 6.4 38.4 0 44.8-16 83.2-48 112-32 28.8-67.2 48-112 48Z" fill="#000000"></path></g></svg>
                                                    </span>
                                                    :
                                                    <span className="position-absolute bj-right-15 bj-top-10">
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <circle cx="12" cy="12" r="3" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></circle> </g></svg>
                                                    </span> 
                                                    
                                                }
                                            </span>
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
