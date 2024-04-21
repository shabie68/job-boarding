import {useLocation, useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
function UpdateProfile() {

	const navigate = useNavigate()
	const location = useLocation();

	useEffect(() => {
		setPhoneNumber(location.state.user.phone_number)
		setSummary(location.state.user.summary)
		setAddress(location.state.user.address)
		setMoreSkills(location.state.user.skills)
		setEducation(location.state.user.education)

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
  
  // Function to filter entries based on search term
  const filterEntries = () => {
    return entries.filter(entry =>
      entry.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
	return (
		<div>
            <span onClick={handleNavigation}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                </svg>
            </span>

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

                            
                            <div>
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