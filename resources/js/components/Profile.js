import {useState, useEffect, useCallback, useContext} from 'react'
import {useNavigate, Link} from 'react-router-dom'
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

    const navigate = useNavigate()
    const [user, setUser] = useState('')
    const [email, setEmail] = useState('')

    const [profile, setProfile] = useState({})
    const [address, setAddress] = useState();

    const [education, setEducation] = useState();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [summary, setSummary] = useState();
    const [skills, setSkills] = useState();

    const [update, setUpdate] = useState(false)

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
            skills: moreSkills,
            education: education
        })
        .then((response) => {
            navigate('/home')
        })
    }


    function getProfile() {
        apiClient.get('http://127.0.0.1:8000/api/get-profile/')
        .then((response) => {
            setUser(response.data.user)
            setEmail(response.data.user.email)
            setProfile(response.data.profile)
            setPhoneNumber(response.data.user.phone_number)
            setAddress(response.data.user.address)
            setSummary(response.data.user.summary)
            setEducation(response.data.user.education)
            console.log(typeof(response.data.user.skills))

            setMoreSkills(response.data.user.skills)

        })
    }

    const handleSkills = (e) => {
        setSkills(e.target.value)
    }

    const handleAddSkills = (value) => {
        if(!moreSkills.includes(value)) {
            setMoreSkills(prev => ([
                ...prev,
                value
            ]));
            setSearchTerm('')
        }
        
    };

    const handleNavigation = ()=> {
        navigate('/user-profile')
    }


    useEffect(() => {
        getProfile()
    }, [])

    return (
         <div>
            <div className="container pt-4">

                <div style={{margin: '0 auto'}} className="w-50 card p-4">
                    <div className="mb-3">{Profile}</div>
                    <h1>{user}</h1>
                    <div className="mb-3">{email}</div>
                    <div className="d-flex align-items-center gap-2 mb-3">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-fill" viewBox="0 0 16 16">
                              <path fileRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                            </svg>
                        </div>

                        <div>{phoneNumber}</div>
                    </div>

                    <div className="d-flex align-items-center gap-2 mb-3">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-fill" viewBox="0 0 16 16">
                              <path fileRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                            </svg>
                        </div>
                        <div>{address}</div>
                    </div>
                    
                    <div className="mb-3">
                        <h1>Skills</h1>
                        {
                            moreSkills?.map((skill) => (

                                <div key={skill} className="badge bg-secondary mx-2">{skill}</div>
                            ))
                        }
                    </div>
                    <div className="text-end">
                        <Link to="update-profile" state={{user:user}}><button className="btn btn-primary">Update</button></Link>
                    </div>
                </div>
               
            </div>
        </div>
    )
}

export default Profile