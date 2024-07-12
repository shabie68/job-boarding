import React from 'react';
import ReactDOM from 'react-dom';
import apiClient from '../services/apiClient';

const YourJob = () => {

	const [jobSubmissions, setJobSubmissions] = React.useState([]);



	const getSubmissions = () => {
		 apiClient.get('http://127.0.0.1:8000/api/get-submissions' )
		 .then((response) => {
		 	setJobSubmissions(response.data.submissions)
		 	response.data.submissions.map((sub) => {
		 		console.log(sub.id)
		 	})
		 })
	}

	React.useEffect(() => {
		getSubmissions()
	}, [])

	return (
			<div>
				<table class="table table-striped">
				  <thead>
				    <tr>
				      <th scope="col"> Job title</th>
				      <th scope="col">First name</th>
				      <th scope="col">Country</th>
				      <th scope="col">Phone</th>
				      <th scope="col">Email</th>
				      <th scope="col">Resume</th>
				    </tr>
				  </thead>
				  <tbody>
					   {jobSubmissions.map((submission) => (
				    		<tr key={submission.id}>
				    			<td>{submission.board_job.title}</td>
				    			<td>{submission.first_name}</td>
				    			<td>{submission.country} </td>
				    			<td>{submission.phone_number}</td>
				    			<td>{submission.email}</td>
				    			<td><a href={`uploads/${submission.resume}`}>Resume</a></td>
				    		</tr>

				    	))}


				  </tbody>
				</table>


			</div>
	)

}

export default YourJob