import React from 'react';
import ReactDOM from 'react-dom';
import ShowJob from './ShowJob'
import AddJob from './AddJob'
import Apply from './Apply'
import Resume from './Resume'
import Experience from './Experience'
import JobQuestions from './JobQuestions'
import Company from './Company'
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

        <BoardJobContext.Provider value={boardJob}>
            <BrowserRouter>
                <div className="d-flex justify-content-around bg-secondary w-100 top-0 my-4 py-2 text-light">
                    <Link className="text-decoration-none text-light" to="/home">Home</Link>
                    <Link className="text-decoration-none text-light" to="/companies">Companies</Link>
                    <div onClick={logout} className=" text-light" style={{ cursor: 'pointer'}}>
                        Logout
                    </div>
                </div>
            

                <div className="container">
                    <Routes>
                        <Route path="/home" element={<ShowJob />} />
                        <Route path="/add-job" element={<AddJob />} />
                        <Route path="/companies" element={<Company />} />
                        <Route path="/add-company" element={<AddCompany />} />
                        <Route path="/apply" element={<Apply user={user} updateJobContext={updateJobContext} />} />
                        <Route path="/resume" element={<Resume user={user} />} />
                        <Route path="/experience" element={<Experience user={user} />} />
                        <Route path="/job-questions" element={<JobQuestions user={user} />} /> 
                    </Routes>
                </div>

            </BrowserRouter>
            
        </BoardJobContext.Provider>
    
    );
}

export default Example;



// if (document.getElementById('example')) {    
//     ReactDOM.render(<Example />, document.getElementById('example'));
// }
