import {React, useContext, useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import apiClient from '../services/apiClient';
import RecruiterJobs from './RecruiterJobs'
import CandidateJobs from './CandidateJobs'
import BoardJobContext from '../contexts/BoardJobContext'


const YourJob = (props) => {

	

	const context = useContext(BoardJobContext)
	const [jobSubmissions, setJobSubmissions] = useState([]);
	const [role, setRole] = useState(10)



	const getSubmissions = () => {
		 apiClient.get('http://127.0.0.1:8000/api/get-submissions' )
		 .then((response) => {
		 	setRole(response.data.role)
		 	setJobSubmissions(response.data.submissions)
		 	// response.data.submissions.map((sub) => {
		 	// 	console.log(sub.id)
		 	// })
		 })
	}

	useEffect(() => {
		getSubmissions()
	}, [])

	return (
			<div>
				{
					role == 1 
					?
					<RecruiterJobs jobSubmissions = {jobSubmissions} updateJobContext={props.updateJobContext} context={context.message} />
					: ''
				}

				{
					role == 2 ?
					<CandidateJobs jobSubmissions = {jobSubmissions} updateJobContext={props.updateJobContext} context={context.message} />
					: ''
				}




			</div>
	)

}

export default YourJob