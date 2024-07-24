import apiClient from '../services/apiClient';

const RecruiterJobs = (props) => {

	const sendMessage = (candidate_id) => {
		apiClient.post('http://127.0.0.1:8000/api/send-msg/', {
          id: candidate_id,
          message: 'Hello Admin!'
         })
	}

	return (
	
		<table class="table table-striped">
			
		  <thead>
		    <tr>
		      <th scope="col"> Job title</th>
		      <th scope="col">First name</th>
		      <th scope="col">Country</th>
		      <th scope="col">Phone</th>
		      <th scope="col">Email</th>
		      <th scope="col">Resume</th>
		      <th scope="col">Message</th>
		    </tr>
		  </thead>

		  <tbody>
			   {props.jobSubmissions.map((submission) => (
		    		<tr key={submission.id}>
		    			<td>{submission.board_job.title}</td>
		    			<td>{submission.first_name}</td>
		    			<td>{submission.country} </td>
		    			<td>{submission.phone_number}</td>
		    			<td>{submission.email}</td>
		    			<td><a href={`uploads/${submission.resume}`}>Resume</a></td>
		    			<td><button className="btn btn-secondary" onClick={() => {sendMessage(submission.user_id)}}>Send Message</button></td>
		    		</tr>

		    	))}


		  </tbody>
		</table>
	)

}

export default RecruiterJobs