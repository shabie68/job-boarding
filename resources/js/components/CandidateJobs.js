import {useContext, useState} from 'react'
import apiClient from '../services/apiClient';
import BoardJobContext from '../contexts/BoardJobContext'




const CandidateJobs = (props) => {

	const context = useContext(BoardJobContext)

	// const messages = [];
	const [messages, setMessages] = useState([])

	const [msg, setMsg] = useState();
	let m = [];
	const [receivedMessages, setReceivedMessages] = useState([])
	const [sendMessages, setSendMessages] = useState([])



	const sendMessage = (company_id) => {

		setSendMessages((prevMessages) => [...prevMessages, msg])
		apiClient.post('http://127.0.0.1:8000/api/send-msg/', {
          id: company_id,
          message: msg
         })
		.then((res) => {

			setReceivedMessages((prevMessages) => [...prevMessages, context.message])

			m.push(context.message)
			// m.push(msg)

			// m = m.flat()
			// console.log("MESSAGE")
			// setReceivedMessages((prevMessages) => [...prevMessages, m])
			// setReceivedMessages(m)
			// console.log(context.message)

			if(context.message) {
				setMessages((prevMessages) => [...prevMessages, context.message])	
			}
			
			setMessages((prevMessages) => [...prevMessages, msg])
		})

		
		// messages.push(msg)
		// messages.push(context.message)
		// messages.flat()



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
		  

	  </>
	)
}

export default CandidateJobs