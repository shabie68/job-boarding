import React from 'react';
import ReactDOM from 'react-dom';
import ShowJob from './ShowJob'
import {useEffect, useState} from 'react'
import apiClient from '../services/apiClient';

import { BrowserRouter, Routes, Route } from "react-router-dom";

function Example() {




    useEffect(() => {
        apiClient.get('http://127.0.0.1:8000/api/get-user')
        // .then(function(response) {
        //     console.log("RESPONSE")
        //     console.log(response)
        // })
    }, [])
    return (
        <div className="container">
        <ShowJob />
        </div>
    );
}

export default Example;



// if (document.getElementById('example')) {    
//     ReactDOM.render(<Example />, document.getElementById('example'));
// }
