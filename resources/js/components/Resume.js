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
		let height = window.innerHeight;
        let menuHeight = document.querySelector('.menubar-links').offsetHeight;

        let footerHeight = document.querySelector('.bj-footer').offsetHeight;
        let containerHeight = 100 - (((menuHeight*100)/height) + ((footerHeight* 100)/height));

        document.querySelector('.container').style.minHeight = height - (menuHeight+footerHeight) + 'px'
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
		<div className="my-4">
			<div className="progress mb-4" style={{height: '7px'}}>
              <div className="progress-bar" id="jb-resume-pbar" role="progressbar" style={{width: "66%"}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
            </div>

			<div className="w-lg-50" style={{margin: '0 auto'}}>
				<h3 className="text-two">Upload your resume</h3>
				<form onSubmit={saveData}>
					<div className="bj-border bj-radius-10 bj-p-20 bg-one">
						<div className="card-body">
							
							<div className="mb-3">
							  <strong><label htmlFor="formFileSm" className="form-label">Choose resume</label></strong>
							  <input
						  		className="bj-input bg-one"	
							  	id="formFileSm"
							  	type="file"
							  	onChange={handleResume}
						    />
							</div>
						</div>
					</div>

					<div className="mt-2 text-end">
                        <button type="submit" className="btn bj-btn-prime text-prime">Continue</button>
                    </div>
				</form>
			</div>

		</div>
	)
}

export default Resume
