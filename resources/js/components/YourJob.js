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
	const [currentPage, setCurrentPage] = useState(1)
	const [nextPage, setNextPage] = useState(null)
    const [lastPage, setLastPage] = useState(1);



	const getSubmissions = () => {
		 apiClient.get(`http://127.0.0.1:8000/api/get-submissions?page=${currentPage}` )
		 .then((response) => {
		 	setRole(response.data.role)
		 	setJobSubmissions(response.data.submissions.data)
		 	setNextPage(response.data.submissions.next_page_url)
            setLastPage(response.data.submissions.last_page)



		 })
	}

	const next = () => {
        setCurrentPage(currentPage + 1);
    };

    const prev = () => {
        setCurrentPage(currentPage - 1);
    };

	useEffect(() => {
		getSubmissions()
       
       	if(!document.querySelector('.bj-close').classList.contains('d-none')) {
          props.closeMenu()
      	}
	}, [currentPage])

	return (
		<div>
			{
				role == 1 
				?
				<RecruiterJobs 
					next={next}
					prev={prev}
					currentPage={currentPage}
					lastPage={lastPage}
					nextPage={nextPage}
					jobSubmissions = {jobSubmissions} updateJobContext={props.updateJobContext} context={context.message} />
				: ''
			}

			{
				role == 2 ?
				<CandidateJobs 
					next={next}
					prev={prev}
					currentPage={currentPage}
					lastPage={lastPage}
					nextPage={nextPage}
					jobSubmissions = {jobSubmissions} updateJobContext={props.updateJobContext} context={context.message} />
				: ''
			}
		</div>
	)

}

export default YourJob