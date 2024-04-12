import React from 'react';
import ReactDOM from 'react-dom';
import ShowJob from './ShowJob'
import AddJob from './AddJob'
import Apply from './Apply'
import Resume from './Resume'
import Experience from './Experience'
import JobQuestions from './JobQuestions'
import AddCompany from './AddCompany'

import {useEffect, useState} from 'react'
import apiClient from '../services/apiClient';
import BoardJobContext from '../contexts/BoardJobContext.js'
import { BrowserRouter, Routes, Link, Route } from "react-router-dom";

function Example() {

    const [user, setUser] = useState(null)
    const [boardJob, setBoardJob] = useState({user_id: null, board_job_id: null, submission: null});

    const updateJobContext = (newContextValue) => {
        setBoardJob(newContextValue);
    };
    const logout = () => {

        apiClient.post('http://127.0.0.1:8000/logout').then(response => {
            if (response.status === 204) {
                window.location = '/login'
            }
        })
    };

    const getUser = () => {
        apiClient.get('http://127.0.0.1:8000/api/get-user')
        .then(response => {
            setUser(response.data.user)
        })
    }

    return (
        <div>
            <div className="d-flex justify-content-between bg-secondary w-100 top-0 my-4" style={{padding: '8px 20px'}}>
                <div onClick={logout} className=" text-primary" style={{ cursor: 'pointer'}}>
                    Logout
                </div>
            </div>

            <BoardJobContext.Provider value={boardJob}>

            <div className="container">
                <BrowserRouter>
                    <Routes>
                        <Route path="/home" element={<AddCompany />} />
                        // <Route path="/home" element={<ShowJob />} />
                        <Route path="/add-job" element={<AddJob />} />
                        <Route path="/apply" element={<Apply user={user} updateJobContext={updateJobContext} />} />
                        <Route path="/resume" element={<Resume user={user} />} />
                        <Route path="/experience" element={<Experience user={user} />} />
                        <Route path="/job-questions" element={<JobQuestions user={user} />} /> 
                    </Routes>

                </BrowserRouter>
            </div>
            </BoardJobContext.Provider>
        </div>
        
    );
}

export default Example;



// if (document.getElementById('example')) {    
//     ReactDOM.render(<Example />, document.getElementById('example'));
// }
