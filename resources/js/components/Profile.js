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

      var entries = [
        "php",
        "laravel",
        "vuejs",
        "javascript",
        "reactjs",
        "nodejs",
        "html",
        "css",
        "c++",
        "java",
        "python",
        "django",
        "mysql",
        "database",
        "docker",
        "wordpress",
        "git",
        "versioncontrol",
        "webpack",
        "bootstrap",
        "npm"
      ];

  const [searchTerm, setSearchTerm] = useState('');
  const [moreSkills, setMoreSkills] = useState([])
  
  // Function to filter entries based on search term
  const filterEntries = () => {
    return entries.filter(entry =>
      entry.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };


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

    const handleAddSkills = (value) => {
    setMoreSkills(prev => ([
        ...prev,
        value
    ]));
};

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

                                <div className="form-group row mb-3">
                                    <div htmlFor="choose-skills" className="col-md-4 col-form-label text-md-end" >Choose Skills</div>
                                    <div className="col-md-6">
                                        <div>
                                            <input
                                              type="text"
                                              className="form-control"
                                              placeholder="Search..."
                                              value={searchTerm}
                                              onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                        </div>

                                        {
                                            searchTerm ?

                                                    <div className="border rounded form-control">
                                                        {filterEntries().map((entry, index) => (
                                                            <div key={entry}>

                                                                <div onClick={()=> {handleAddSkills(entry)}} className="jb-skill">{entry}</div>
                                                            </div>
                                                        ))}
                                                  </div>
                                            : ''
                                        }
                                        
                                    </div>
                                </div>


                                <div className="form-group row mb-3">
                                    <div htmlFor="skills" className="col-md-4 col-form-label text-md-end" >Selected Skills</div>
                                    <div className="col-md-6">
                                      


                                        {
                                        moreSkills.map((skill) => (

                                            <>
                                            <div key={skill} className="badge bg-secondary mx-2">{skill}</div>
                                            </>
                                        ))
                                      }
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