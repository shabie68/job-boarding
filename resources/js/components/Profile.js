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


function Profile(props) {

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

        let height = window.innerHeight;
        let menuHeight = document.querySelector('.menubar-links').offsetHeight;

        let footerHeight = document.querySelector('.bj-footer').offsetHeight;
        let containerHeight = 100 - (((menuHeight*100)/height) + ((footerHeight* 100)/height)) + 'px';
        document.querySelector('.container').style.minHeight = height - (menuHeight+footerHeight) + 'px'
        // let footerHeight = document.querySelector('.bj-footer').offsetHeight;
        // let menuHeight = document.querySelector('.menubar-links').offsetHeight;
        // let containerHeight = document.querySelector('.bj-content').offsetHeight;
        if(!document.querySelector('.bj-close').classList.contains('d-none')) {
          props.closeMenu()
        }
        

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
            
            <div className="my-4">
                <section style={{margin: '0 auto'}} className="bj-card-w">
                    <h3 className="text-two">Profile</h3>
                    <div className="card bj-border bg-one p-4">
                        <strong>{user.name}</strong>
                        <div className="mb-3">{email}</div>
                        <div>
                            <strong>Summary</strong>
                            <p className="mb-3">{summary}</p>
                        </div>
                        
                        <strong>Phone</strong>
                        <div className="d-flex align-items-center gap-2 mb-3">
                            
                            <div>
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 5.5C3 14.0604 9.93959 21 18.5 21C18.8862 21 19.2691 20.9859 19.6483 20.9581C20.0834 20.9262 20.3009 20.9103 20.499 20.7963C20.663 20.7019 20.8185 20.5345 20.9007 20.364C21 20.1582 21 19.9181 21 19.438V16.6207C21 16.2169 21 16.015 20.9335 15.842C20.8749 15.6891 20.7795 15.553 20.6559 15.4456C20.516 15.324 20.3262 15.255 19.9468 15.117L16.74 13.9509C16.2985 13.7904 16.0777 13.7101 15.8683 13.7237C15.6836 13.7357 15.5059 13.7988 15.3549 13.9058C15.1837 14.0271 15.0629 14.2285 14.8212 14.6314L14 16C11.3501 14.7999 9.2019 12.6489 8 10L9.36863 9.17882C9.77145 8.93713 9.97286 8.81628 10.0942 8.64506C10.2012 8.49408 10.2643 8.31637 10.2763 8.1317C10.2899 7.92227 10.2096 7.70153 10.0491 7.26005L8.88299 4.05321C8.745 3.67376 8.67601 3.48403 8.55442 3.3441C8.44701 3.22049 8.31089 3.12515 8.15802 3.06645C7.98496 3 7.78308 3 7.37932 3H4.56201C4.08188 3 3.84181 3 3.63598 3.09925C3.4655 3.18146 3.29814 3.33701 3.2037 3.50103C3.08968 3.69907 3.07375 3.91662 3.04189 4.35173C3.01413 4.73086 3 5.11378 3 5.5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                            </div>

                            <div>{phoneNumber}</div>
                        </div>

                        <strong>Address</strong>
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <div>
                                <svg viewBox="0 0 1024 1024" fill="#000000" width="16" height="16" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M512 1012.8c-253.6 0-511.2-54.4-511.2-158.4 0-92.8 198.4-131.2 283.2-143.2h3.2c12 0 22.4 8.8 24 20.8 0.8 6.4-0.8 12.8-4.8 17.6-4 4.8-9.6 8.8-16 9.6-176.8 25.6-242.4 72-242.4 96 0 44.8 180.8 110.4 463.2 110.4s463.2-65.6 463.2-110.4c0-24-66.4-70.4-244.8-96-6.4-0.8-12-4-16-9.6-4-4.8-5.6-11.2-4.8-17.6 1.6-12 12-20.8 24-20.8h3.2c85.6 12 285.6 50.4 285.6 143.2 0.8 103.2-256 158.4-509.6 158.4z m-16.8-169.6c-12-11.2-288.8-272.8-288.8-529.6 0-168 136.8-304.8 304.8-304.8S816 145.6 816 313.6c0 249.6-276.8 517.6-288.8 528.8l-16 16-16-15.2zM512 56.8c-141.6 0-256.8 115.2-256.8 256.8 0 200.8 196 416 256.8 477.6 61.6-63.2 257.6-282.4 257.6-477.6C768.8 172.8 653.6 56.8 512 56.8z m0 392.8c-80 0-144.8-64.8-144.8-144.8S432 160 512 160c80 0 144.8 64.8 144.8 144.8 0 80-64.8 144.8-144.8 144.8zM512 208c-53.6 0-96.8 43.2-96.8 96.8S458.4 401.6 512 401.6c53.6 0 96.8-43.2 96.8-96.8S564.8 208 512 208z" fill=""></path></g></svg>
                            </div>
                            <div>{address}</div>
                        </div>
                        
                        <div className="mb-3">
                            <strong>Skills</strong>
                            <section className="d-flex gap-2">
                                {
                                    moreSkills?.map((skill) => (

                                        <div key={skill} className="badge bg-three">{skill}</div>
                                    ))
                                }
                            </section>
                        </div>
                    </div>
                    <div className="text-end my-2">
                        <Link to="/update-profile" state={{user:user}}><button className="btn bj-btn-prime text-prime">Update</button></Link>
                    </div>
                </section>
                
               
            </div>
        </div>
    )
}

export default Profile