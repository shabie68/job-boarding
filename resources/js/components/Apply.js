import {useState, useEffect, createContext} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import { useContext } from 'react';
import apiClient from '../services/apiClient';
import BoardJobContext from '../contexts/BoardJobContext.js'


function Apply(props) {

	const location = useLocation()
	const context = useContext(BoardJobContext)

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('')
	const [email, setEmail] = useState('')
	const navigate = useNavigate();
	const [submission, setSubmission] = useState({})
	const [job, setJob] = useState();

	useEffect(() => {
		saveDefaultData()

	}, [])

	const saveData = () => {
		
		apiClient.put('http://127.0.0.1:8000/api/apply/candidate/'+location.state.job.user_id + '/job/' + submission.board_job_id, {
			submission: JSON.stringify(submission),
			first_name: firstName,
			last_name: lastName,
			phone_number: phoneNumber,
			email, email

		})
		.then((response) => {
			props.updateJobContext({user_id: location.state.job.user_id, board_job_id: submission.board_job_id, submission: response.data.submission})
			navigate('/resume')
		})
		.catch((error) => {

		})
	}

	function saveDefaultData() {
		apiClient.post('http://127.0.0.1:8000/api/add-job-data/', {
			jobId: location.state.job.id,
            company_id: location.state.job.company_id
		})
		.then((response) => {
            console.log(response.data)
			setSubmission(response.data.submission)
            setFirstName(response.data.submission.first_name)
            setLastName(response.data.submission.last_name)
            setPhoneNumber(response.data.submission.phone_number)
            setEmail(response.data.submission.email)
		})
	}

	return (
		
		<div>
            
			<div className="w-lg-50" style={{margin: '0 auto'}}>
				<h4>Add your resume</h4>
				<div className="card">
					<div className="card-body">
                    	<div className="">

                            <label htmlFor="first-name" className="col-form-label"><b>First Name</b></label>
                            <div className="">
                                <input
                                    type="text"
                                    name="first-name"
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                    required
                                    className="form-control"
                                />
                            </div>
                        </div>

                        <div className="">
                            <label htmlFor="last-name" className="col-form-label"><b>Last Name</b></label>
                            <div className="">
                                <input
                                    type="text"
                                    name="last-name"
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)}
                                    required
                                    className="form-control"
                                />
                            </div>
                        </div>

                        <div className="">
                            <label htmlFor="phone" className="col-form-label"><b>Phone</b></label>
                            <div className="">
                                <input
                                    type="tel"
                                    name="phone"
                                    value={phoneNumber}
                                    onChange={e => setPhoneNumber(e.target.value)}
                                    required
                                    className="form-control"
                                />
                            </div>
                        </div>



                        <div className="">
                            <label htmlFor="email" className="col-form-label"><b>Email</b></label>
                            <div className="">
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    className="form-control"
                                />
                            </div>
                        </div>


                        <div className="mt-2 text-align-end">
                            <button type="button" className="btn btn-primary" onClick={saveData}>Continue</button>
                        </div>
	                </div>
				</div>
			</div>
		</div>
	)
}


export default Apply