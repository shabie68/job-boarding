import {useContext, useState, useEffect} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import apiClient from '../services/apiClient';


function Resume(props) {

	const context = useContext(BoardJobContext)
	const location = useLocation()
	const [resume, setResume] = useState();

	const navigate = useNavigate();

	useEffect(() => {
		
		console.log("EFFECT")
		console.log(context)
	})

	const saveData = () => {
		
		apiClient.put('http://127.0.0.1:8000/api/apply/candidate/'+location.state.job.user_id + '/job/' + submission.board_job_id, {
			resume: resume,
			
		})
		.then((response) => {
			// navigate('/experience')
		})
		.catch((error) => {

		})
	}


	return (
		<div>
			<div className="w-50" style={{margin: '0 auto'}}>
				<h4>Upload your resume</h4>
				<div className="card">	
					<div className="card-body">
						<div className="mb-3">
						  <label htmlFor="formFileSm" className="form-label">Small file input example</label>
						  <input 
						  	className="form-control form-control-sm" 
						  	id="formFileSm" 
						  	type="file" 
						  	value={resume}
						  	onClick={e => {setResume(e.target.value)}}
					    />
						</div>

						<div className="mt-2 text-align-end">
                            <button type="button" className="btn btn-primary" onClick={saveData}>Continue</button>
                        </div>
					</div>
				</div>
			</div>

		</div>
	)
}

export default Resume