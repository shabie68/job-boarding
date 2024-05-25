import {useState, useEffect, useCallback, useContext} from 'react'
import {useNavigate, Link, useLocation} from 'react-router-dom'
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
    const location = useLocation()
    const [user, setUser] = useState('')
    const [email, setEmail] = useState('')
    const [success, setSuccess] = useState(false)
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
            console.log(response.data.user)
            setMoreSkills(response.data.user.skills)

        })
    }

    const handleSkills = (e) => {
        setSkills(e.target.value)
    }


    useEffect(() => {
        getProfile()
        setSuccess(location.state?.update)
        setTimeout(() => {
            setSuccess(false)
        }, 3000)
    }, [])


    return (
         <div>
            {
                success ?
                <div className="text-success text-center" style={{backgroundColor: '#c3ff624d', padding: '8px 0'}}>
                    Profile Successfully Updated!
                </div>
                :''
            }
            
            <div className="container pt-4">
                <section style={{margin: '0 auto'}} className="w-50">
                    <h2>Profile</h2>
                    <div className="card p-4">
                        <h3>{user.name}</h3>
                        <div className="mb-3">{email}</div>
                        <div>
                            <h3>Summary</h3>
                            <p className="mb-3">{summary}</p>
                        </div>
                        
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
                                <svg viewBox="0 0 1024 1024" fill="#000000" width="16" height="16" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M512 1012.8c-253.6 0-511.2-54.4-511.2-158.4 0-92.8 198.4-131.2 283.2-143.2h3.2c12 0 22.4 8.8 24 20.8 0.8 6.4-0.8 12.8-4.8 17.6-4 4.8-9.6 8.8-16 9.6-176.8 25.6-242.4 72-242.4 96 0 44.8 180.8 110.4 463.2 110.4s463.2-65.6 463.2-110.4c0-24-66.4-70.4-244.8-96-6.4-0.8-12-4-16-9.6-4-4.8-5.6-11.2-4.8-17.6 1.6-12 12-20.8 24-20.8h3.2c85.6 12 285.6 50.4 285.6 143.2 0.8 103.2-256 158.4-509.6 158.4z m-16.8-169.6c-12-11.2-288.8-272.8-288.8-529.6 0-168 136.8-304.8 304.8-304.8S816 145.6 816 313.6c0 249.6-276.8 517.6-288.8 528.8l-16 16-16-15.2zM512 56.8c-141.6 0-256.8 115.2-256.8 256.8 0 200.8 196 416 256.8 477.6 61.6-63.2 257.6-282.4 257.6-477.6C768.8 172.8 653.6 56.8 512 56.8z m0 392.8c-80 0-144.8-64.8-144.8-144.8S432 160 512 160c80 0 144.8 64.8 144.8 144.8 0 80-64.8 144.8-144.8 144.8zM512 208c-53.6 0-96.8 43.2-96.8 96.8S458.4 401.6 512 401.6c53.6 0 96.8-43.2 96.8-96.8S564.8 208 512 208z" fill=""></path></g></svg>
                            </div>
                            <div>{address}</div>
                        </div>
                        
                        <div className="mb-3">
                            <h3>Skills</h3>
                            {
                                moreSkills?.map((skill) => (

                                    <div key={skill} className="badge bg-secondary mx-2">{skill}</div>
                                ))
                            }
                        </div>
                        <div className="text-end">
                            <Link to="/update-profile" state={{user:user}}><button className="btn btn-primary">Update</button></Link>
                        </div>
                    </div>
                </section>
                
               
            </div>
        </div>
    )
}

export default Profile