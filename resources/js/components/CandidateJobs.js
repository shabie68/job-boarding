import {useContext} from 'react'
import apiClient from '../services/apiClient';
import BoardJobContext from '../contexts/BoardJobContext'




const CandidateJobs = (props) => {

	const context = useContext(BoardJobContext)

	const sendMessage = (company_id) => {
		apiClient.post('http://127.0.0.1:8000/api/send-msg/', {
          id: company_id,
          message: 'Hello Admin!'
         })
	}

	return (
		<>
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


		  <div className="card position-absolute" style={{bottom: 0, right: '50px', zIndex: 9, height: '40%', overflow: 'auto'}}>
			<div className="card-header">
				By {context?.message?.user?.name}
			</div>

			<div className="card-body">
				<p>
					{context?.message?.message}
				</p>
			</div>

			<div className="card-footer">
				<div className="d-flex justify-content-end">
					<button>Close</button>
				</div>
			</div>
		</div>

	  </>
	)
}

export default CandidateJobs