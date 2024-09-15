import {useContext, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import apiClient from '../services/apiClient';
import BoardJobContext from '../contexts/BoardJobContext'


const RecruiterJobs = (props) => {

	const navigate = useNavigate();

	const context = useContext(BoardJobContext)

	const [messages, setMessages] = useState([])
	const [recepient, setRecepient] = useState(context?.message?.user?.id)
	// let messages = [];

	const [msg, setMsg] = useState('')
	let m = [];
	const [receivedMessages, setReceivedMessages] = useState([])
	const [sendMessages, setSendMessages] = useState([])
	const [chatMessages, setChatMessages] = useState([])





	// const sendMessage = (candidate_id) => {
	// 	apiClient.post('http://127.0.0.1:8000/api/send-msg/', {
 //          id: candidate_id,
 //          message: 'Hello Admin!'
 //         })
	// }

	const acceptCandidate = (submission) => {
		let rejectedSubmissions = props.jobSubmissions.filter((_submission) => {
			return _submission.id !=submission.id
		})

		apiClient.post('http://127.0.0.1:8000/api/accept/submission/' + submission.id, {
			id: submission.user_id,
			message: 'Congraturlations! You have been selected for the job ' + submission.board_job.title,
			rejectedSubmissions: rejectedSubmissions
		})
		.then(() => {
			// window.location = '/home'
			alert("Congratulations! You have been selected")
			navigate('/home')
			
		})
	}

	
	const sendMessage = () => {
		setSendMessages((prevMessages) => [...prevMessages, msg])
		setReceivedMessages((prevMessages) => [...prevMessages, context.message])
		apiClient.post('http://127.0.0.1:8000/api/send-msg', {
			id: context?.user_id,
			message: msg
		})
		.then(() => {
			let mess = [sendMessages, receivedMessages]
			// setChatMessages((prevMessages) => [...prevMessages,[sendMessages, receivedMessages]])
			setChatMessages(mess)


			// messages.push(msg)
			// messages.push(context.message)
			// console.log(messages.flat())

			// console.log("HERE IS THE MESSAgE")

			m.push(context.message)
			// m.push(msg)
			m = m.flat()
			console.log("Message is here")
			console.log(context.message)
			setReceivedMessages(m)
			if(context.message) {
				setMessages((prevMessages) => [...prevMessages, context.message])
			}
			

			setMessages((prevMessages) => [...prevMessages, msg])

			// let msg = context.message.message;
			// msg.push()
			// props.updateJobContext({user_id: null, submission: null, message})

			// props.updateJobContext((prevMessages) => [...prevMessages, data['message']]);

			// props.updateJobContext((prevMessages) => ({
			//   ...prevMessages,
			//   message: [...prevMessages.message, 'new message'],
			//   user_id: null,
			//   submission: null
			// }));
		})
	}

	return (
		<div className="mb-4">
			<p>
				Here you will find a list of candidates who applied to the jobs that your company posted. You can view candidate's resume
				by click on the desire candidate column. Candidates can be accepted, rejected by setting the status to accepted.
			</p>
			<table class="table table-striped">


				<caption>
					<strong>Received Applications</strong>
				</caption>

			  <thead>
			    <tr>
			      <th scope="col"> Job title</th>
			      <th scope="col">First name</th>
			      <th scope="col">Country</th>
			      <th scope="col">Phone</th>
			      <th scope="col">Email</th>
			      <th scope="col">Resume</th>
			      <th scope="col">Confirmation</th>
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
			    			<td><button className="btn bj-btn-table" onClick={() => {acceptCandidate(submission)}}>Accept candidate</button></td>
			    		</tr>
			    	))}

			  </tbody>
			</table>

			<div className="d-flex gap-2 align-items-center">
               <button className="btn bj-btn-prime btn-link"  onClick={props.prev} disabled={props.currentPage === 1} style={{border: '1px solid lightslategrey'}}>

                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                </svg>
               </button>

               <span>
                Showing page {props.currentPage} of {props.lastPage}
               </span>

              <button className="btn bj-btn-prime btn-link" onClick={props.next} disabled={!props.nextPage} style={{border: '1px solid lightslategrey'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                </svg>
              </button>
            </div>

		</div>
	)

}

export default RecruiterJobs
/**


// 0337 0304040 yasir

**/