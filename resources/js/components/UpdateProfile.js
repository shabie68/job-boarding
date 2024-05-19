import {useLocation, useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import apiClient from '../services/apiClient';

function UpdateProfile() {

	const navigate = useNavigate()
	const location = useLocation();

	useEffect(() => {
		setPhoneNumber(location.state.user.phone_number)
		setSummary(location.state.user.summary)
		setAddress(location.state.user.address)
		setMoreSkills(location.state.user.skills)
		setEducation(location.state.user.education)
		console.log(location.state.user)

	}, [])
		
    const [profile, setProfile] = useState({})
    const [address, setAddress] = useState();

    const [education, setEducation] = useState();
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

  function saveProfile() {
        apiClient.put('http://127.0.0.1:8000/api/save-profile/', {
            address: address,
            phoneNumber: phoneNumber,
            summary, summary,
            skills: moreSkills,
            education: education
        })
        .then((response) => {
            // navigate('/home')
        })
    }


  // Function to filter entries based on search term
  const filterEntries = () => {
    return entries.filter(entry =>
      entry.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

   const handleNavigation = ()=> {
        navigate('/user-profile')
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
	return (
			<div>
				<div className="d-flex gap-2 align-items-center">
		            <span onClick={handleNavigation}>
		                <svg style={{color: 'black'}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
						  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
						</svg>
		            </span>
		            <strong>Go back</strong>
	            </div>

	            <div className="row justify-content-center">
	                <div className="col-md-8">
	                    <div className="card">
	                        <div className="card-header">
	                            Profile
	                        </div>

	                        <div className="card-body">

	                            <div className="form-group row mb-3">
	                                <label htmlFor="exampleFormControlTextarea1" className="col-md-4 col-form-label text-md-end" >Summary</label>
	                                <div className="col-md-6">
	                                    <textarea id="exampleFormControlTextarea1" rows="3" className="form-control" onChange={(e) => {setSummary(e.target.value)}} defaultValue={summary}></textarea>
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

	                            <div className="row mb-3">
	                                <label htmlFor="email" className="col-md-4 col-form-label text-md-end">Education</label>
	                                <div className="col-md-6">
	                                    <input
	                                        type="text"
	                                        name="address"
	                                        placeholder="Education"
	                                        value={education}
	                                        onChange={(e) => { setEducation(e.target.value)}}
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
	                                <div className="col-md-6 d-flex align-items-center">
	                                  


	                                    {
	                                        moreSkills?.map((skill) => (

	                                            <>
	                                            <div key={skill} className="badge bg-secondary mx-2">{skill}</div>
	                                            </>
	                                        ))
	                                    }
	                                </div>
	                            </div>

	                            <div class="text-align-end">
	                                <button className="btn btn-primary" onClick={saveProfile}>Save</button>
	                            </div>
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </div>
	)
}

export default UpdateProfile