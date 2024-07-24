import apiClient from '../services/apiClient';



const CandidateJobs = (props) => {

	const sendMessage = (company_id) => {
		apiClient.post('http://127.0.0.1:8000/api/send-msg/', {
          id: company_id,
          message: 'Hello Admin!'
         })
	}

	return (
		<table class="table table-striped">

		  <thead>
		    <tr>
		      <th scope="col">Job title</th>
		      <th scope="col">Company name</th>
		      <th scope="col">Contact</th>
		    </tr>
		  </thead>

		  <tbody>
		  	{
		  		props.jobSubmissions.map((submission) => (
		  			<tr>
		  				<td style={{verticalAlign: 'middle'}}>{submission.board_job.title}</td>
		  				<td style={{verticalAlign: 'middle'}}>{submission.company.title}</td>
		  				<td><button type="button" onClick={() => {sendMessage(submission.company_id)}} className="btn btn-secondary">Message</button></td>
		  			</tr>
		  		))
		  	}
		  </tbody>


	  </table>
	)
}

export default CandidateJobs