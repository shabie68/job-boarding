import {useNavigate} from 'react-router-dom'

function JobQuestions() {

	const navigate = useNavigate();

	const saveData = () => {
		alert('last step')
		// history.push('/resume');
		// navigate('/job-questions')
		// axios.post('http://127.0.0.1:8000/api/apply')
		// .then((response) => {
		// 	window.location = '/resume'
		// })
		// .catch((error) => {

		// })
	}


	return (
		<div>
			<div className="w-50" style={{margin: '0 auto'}}>
				<h4>Upload your resume</h4>
				<div className="card">	
					<div className="card-body">
						<div className="mb-3">
						  <label htmlFor="formFileSm" className="form-label">Small file input example</label>
						  <input className="form-control form-control-sm" id="formFileSm" type="file" />
						</div>

						HERE IS JOB JobQuestions

						<div className="mt-2 text-align-end">
                            <button type="button" className="btn btn-primary" onClick={saveData}>Continue</button>
                        </div>
					</div>
				</div>
			</div>

		</div>
	)
}

export default JobQuestions;