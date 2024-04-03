import React from 'react';
import ReactDOM from 'react-dom';
import ShowJob from './ShowJob'
import AddJob from './AddJob'
import {useEffect, useState} from 'react'
import apiClient from '../services/apiClient';

import { BrowserRouter, Routes, Link, Route } from "react-router-dom";

function Example() {

    return (
        <div className="container">
            <BrowserRouter>
                <Routes>
                    <Route path="/home" element={<ShowJob />} />
                    <Route path="/add-job" element={<AddJob />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default Example;



// if (document.getElementById('example')) {    
//     ReactDOM.render(<Example />, document.getElementById('example'));
// }
