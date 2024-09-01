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

			if(context.message) {
				setMessages((prevMessages) => [...prevMessages, context.message])	
			}
			
			setMessages((prevMessages) => [...prevMessages, msg])
		})
	}

	return (
		<>
			<table class="table table-striped">

			  <thead>
			    <tr>
			      <th scope="col">Job title</th>
			      <th scope="col">Company name</th>
			    </tr>
			  </thead>

			  <tbody>
			  	{
			  		props.jobSubmissions.map((submission) => (
			  			<tr>
			  				<td style={{verticalAlign: 'middle'}}>{submission.board_job.title}</td>
			  				<td style={{verticalAlign: 'middle'}}>{submission.company.title}</td>
			  			</tr>
			  		))
			  	}
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
		  

	  </>
	)
}

export default CandidateJobs