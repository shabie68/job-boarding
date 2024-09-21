import apiClient from '../services/apiClient';
import {useState} from 'react'

const Faqs = () => {

	const [role, setRole] = useState(-1);

	apiClient.get('http://127.0.0.1:8000/api/get-user-role')
	.then((response) => {
		console.log("ROLE")
		console.log(response)
		setRole(response.data.role)
	})


	return (
		<div>
			{
				role == 1 ?
				<div className="accordion accordion-flush" id="accordionFlushExample">
				  <div className="accordion-item">
				    <h2 className="accordion-header" id="flush-headingOne">
				      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
				        How many jobs can be added by a company?
				      </button>
				    </h2>
				    <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
				      <div className="accordion-body">There is no limitations on adding the number of jobs. Company can add as many jobs as it want</div>
				    </div>
				  </div>
				  <div className="accordion-item">
				    <h2 className="accordion-header" id="flush-headingTwo">
				      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
				        How to accept a candidate?
				      </button>
				    </h2>
				    <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
				      <div className="accordion-body">Once atleast 1 candidate have applied to the job your company posted. Just go to the <strong>Your Jobs</strong> menubar, there candidate can be added or rejected</div>
				    </div>
				  </div>
				  <div className="accordion-item">
				    <h2 className="accordion-header" id="flush-headingThree">
				      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
				        We want the reviews for our company?
				      </button>
				    </h2>
				    <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
				      <div className="accordion-body">Yes reviews can be added to every company by candidates. Before adding a review candidates are ask to verify their review by contacting the relevant company</div>
				    </div>
				  </div>

				  <div className="accordion-item">
				    <h2 className="accordion-header" id="flush-headingFour">
				      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseThree">
				        How a candidate can be contacted?
				      </button>
				    </h2>
				    <div id="flush-collapseFour" className="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
				      <div className="accordion-body">Recruiters can contact candidates by sending them messages. See message icon at the right bottom <strong>Home Page</strong> and in the drop down you have a list of all candidates who have applied to the jobs you have posted</div>
				    </div>
				  </div>
				</div>
				
				: 
				role == 2 

				?

				<div className="accordion accordion-flush" id="accordionFlushExample">
				  <div className="accordion-item">
				    <h2 className="accordion-header" id="flush-headingOne">
				      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
				        How to apply for a job?				      
				      </button>
				    </h2>
				    <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
				      <div className="accordion-body">Just go to the home page, there a list of job will be loaded. Want to find relevant job. Just make use of search input. Try type <b>developer</b> and it will filter the result for you. Only showing jobs having developer in the title</div>
				    </div>
				  </div>
				  <div className="accordion-item">
				    <h2 className="accordion-header" id="flush-headingTwo">
				      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
				        Can I setup my profile?
				      </button>
				    </h2>
				    <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
				      <div className="accordion-body">Yes you have to go to <strong>Profile</strong> menubar and there you can update your profile</div>
				    </div>
				  </div>
				  <div className="accordion-item">
				    <h2 className="accordion-header" id="flush-headingThree">
				      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
				        Can I review a company?
				      </button>
				    </h2>
				    <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
				      <div className="accordion-body">Yes you can add a review for a company but it must be authentic and company may contact you the review you have added</div>
				    </div>
				  </div>
				</div>
				: ''

			}
			
		</div>
	)
}

export default Faqs