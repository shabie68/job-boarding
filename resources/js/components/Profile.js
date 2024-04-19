import {useState, useEffect, useCallback, useContext} from 'react'
import Quill from 'quill';

import Toolbar from "quill/modules/toolbar";
import Snow from "quill/themes/snow";

import Bold from "quill/formats/bold";
import Italic from "quill/formats/italic";
import Header from "quill/formats/header";
import apiClient from '../services/apiClient';
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";


function Profile() {

    const [address, setAddress] = useState();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [summary, setSummary] = useState();
    const [skills, setSkills] = useState();

    function saveProfile() {
        apiClient.put('http://127.0.0.1:8000/api/save-profile/', {
            address: address,
            phoneNumber: phoneNumber,
            summary, summary,
            skills: skills
        })
        .then((response) => {

        })
    }

    const handleSkills = (e) => {
        setSkills(e.target.value)
    }

    useEffect(() => {
        
    }, [])

    return (
         <div>
            <div className="container pt-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">
                                Profile
                            </div>

                            <div className="card-body">

                                <div className="form-group row mb-3">
                                    <label htmlFor="exampleFormControlTextarea1" className="col-md-4 col-form-label text-md-end" >Example textarea</label>
                                    <div className="col-md-6">
                                        <textarea id="exampleFormControlTextarea1" rows="3" className="form-control" onChange={(e) => {setSummary(e.target.value)}}></textarea>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label htmlFor="email" className="col-md-4 col-form-label text-md-end">Phone Number</label>
                                    <div className="col-md-6">
                                        <input
                                            type="tel"
                                            name="phone_number"
                                            placeholder="Phone Number"
                                            value={phoneNumber}
                                            onChange={(e) => {setPhoneNumber(e.target.value)}}
                                            required
                                            className="form-control"
                                        />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label htmlFor="email" className="col-md-4 col-form-label text-md-end">Address</label>
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            name="address"
                                            placeholder="Address"
                                            value={address}
                                            onChange={(e) => { setAddress(e.target.value)}}
                                            required
                                            className="form-control"
                                        />
                                    </div>
                                </div>


                                <div className="form-group row mb-3">
                                    <label htmlFor="skills" className="col-md-4 col-form-label text-md-end" >Example textarea</label>
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            name="skills"
                                            placeholder="Skills"
                                            value={skills}
                                            onChange={handleSkills}
                                            required
                                            className="form-control"
                                        />
                                    </div>
                                </div>

                                <div className="row">

                                    <div className="col-md-4 text-md-end">
                                        <div className="mb-3 d-flex gap-2">

                                            {
                                                skills?.split(',').map((skill) => (
                                                    <>
                                                    <span key={skill} className="badge bg-secondary">{skill}</span>
                                                    </>
                                                ))

                                            }
                                        </div>
                                        </div>

                                </div>
                                
                                <div>
                                    <button className="btn btn-primary" onClick={saveProfile}>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile