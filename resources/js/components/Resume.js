import {useContext, useState, useEffect} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import apiClient from '../services/apiClient';
import BoardJobContext from '../contexts/BoardJobContext'


function Resume(props) {

	const context = useContext(BoardJobContext)
	const location = useLocation()
	const [resume, setResume] = useState();

	const handleResume = (e) => {
		setResume(e.target.files[0])
	}

	const navigate = useNavigate();

	useEffect(() => {
		
	})

	const saveData = (e) => {

		e.preventDefault()

		const formData = new FormData();
	    formData.append('resume', resume);
	    formData.append('submission', JSON.stringify(context.submission))

	    formData.append('_method', 'put')

		
		apiClient.post('http://127.0.0.1:8000/api/apply/candidate/'+context.user_id + '/job/' + context.board_job_id, formData)
		.then((response) => {
			props.updateJobContext({user_id: response.data.submission.user_id, board_job_id: response.data.submission.board_job_id, submission: response.data.submission})
			navigate('/job-questions' )
		})
		.catch((error) => {

		})

	}


	return (
		<div>
			<div className="w-lg-50" style={{margin: '0 auto'}}>
				<h4>Upload your resume</h4>

				<div className="card">	
					<div className="card-body">
						<form onSubmit={saveData}>
						<div className="mb-3">
						  <label htmlFor="formFileSm" className="form-label">Small file input example</label>
						  <input 
						  	className="form-control form-control-sm" 
						  	id="formFileSm" 
						  	type="file" 
						  	onChange={handleResume}
					    />
						</div>


						<div className="mt-2 text-align-end">
                            <button type="submit" className="btn btn-primary">Continue</button>
                        </div>
                        </form>
					</div>
				</div>
			</div>

		</div>
	)
}

export default Resume