import {useContext, useState} from 'react'
import apiClient from '../services/apiClient';
import BoardJobContext from '../contexts/BoardJobContext'

const RecruiterJobs = (props) => {

	

	const context = useContext(BoardJobContext)

	const [msgResponse, setMessageResponse] = useState(context?.message?.message)
	const [recepient, setRecepient] = useState(context?.message?.user.id)



	// const sendMessage = (candidate_id) => {
	// 	apiClient.post('http://127.0.0.1:8000/api/send-msg/', {
 //          id: candidate_id,
 //          message: 'Hello Admin!'
 //         })
	// }

	
	const sendMessage = () => {
		console.log(context?.message?.user.id)
		apiClient.post('http://127.0.0.1:8000/api/send-msg', {
			id: context?.message?.user.id,
			message: 'Welcome ' + context.message.user.name
		})
		.then(() => {
			props.updateJobContext({user_id: null, submission: null, message})
			// props.updateJobContext((prevMessages) => ({
			//   ...prevMessages,
			//   message: [...prevMessages.message, 'new message'],
			//   user_id: null,
			//   submission: null
			// }));
		})
	}

	return (
		<>
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

			<div className="card position-absolute" style={{bottom: 0, right: '50px', zIndex: 9}}>
				<div className="card-header">
					By {context?.message?.user?.name}
				</div>

				<div className="card-body">
					<p>
						{context?.message?.message}
					</p>

				</div>

				<div>
					<button onClick={sendMessage}>Send</button>
				</div>
			</div>
		</>
	)

}

export default RecruiterJobs