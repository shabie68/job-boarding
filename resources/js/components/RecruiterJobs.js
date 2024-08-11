import {useContext, useState} from 'react'
import apiClient from '../services/apiClient';
import BoardJobContext from '../contexts/BoardJobContext'

const RecruiterJobs = (props) => {

	

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
			    		</tr>

			    	))}

			  </tbody>
			</table>
		</>
	)

}

export default RecruiterJobs