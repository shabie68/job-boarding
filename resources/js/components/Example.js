import React from 'react';
import ReactDOM from 'react-dom';
import ShowJob from './ShowJob'
import AddJob from './AddJob'
import {useEffect, useState} from 'react'
import apiClient from '../services/apiClient';

import { BrowserRouter, Routes, Link, Route } from "react-router-dom";

function Example() {

    const logout = () => {

        apiClient.post('http://127.0.0.1:8000/logout').then(response => {
            if (response.status === 204) {
                window.location = '/login'
            }
        })
    };

    return (
        <div>
            <div className="d-flex justify-content-between bg-secondary w-100 top-0 my-4" style={{padding: '8px 20px'}}>
                <div onClick={logout} className=" text-primary" style={{ cursor: 'pointer'}}>
                    Logout
                </div>
            </div>

            <div className="container" >
            
                <BrowserRouter>
                    <Routes>
                        <Route path="/home" element={<ShowJob />} />
                        <Route path="/add-job" element={<AddJob />} />
                    </Routes>
                </BrowserRouter>
            </div>

        </div>
        
    );
}

export default Example;



// if (document.getElementById('example')) {    
//     ReactDOM.render(<Example />, document.getElementById('example'));
// }
