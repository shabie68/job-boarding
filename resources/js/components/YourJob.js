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
		let height = window.innerHeight;
        let menuHeight = document.querySelector('.menubar-links').offsetHeight;

        let footerHeight = document.querySelector('.bj-footer').offsetHeight;
        let containerHeight = 100 - (((menuHeight*100)/height) + ((footerHeight* 100)/height));

        document.querySelector('.container').style.minHeight = height - (menuHeight+footerHeight) + 'px'
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