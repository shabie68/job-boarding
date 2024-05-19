import {Link} from 'react-router-dom'
function SingleJob(props) {

	 function handleNavigation() {
        
        document.querySelector('.jb-single-job').classList.add('d-sm-none')
        document.querySelector('.jb-jobs').classList.remove('jb-all-jobs')
        document.querySelector('.jb-add-job-btn').classList.remove('d-sm-none')
    }

	
	//create dummy record for the user and job board
	return (
		<div className="jb-single-job w-lg-50 d-sm-none d-lg-block">
			<span onClick={handleNavigation} className="jb-back-btn jb-back-sm-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                </svg>
            </span>

			<div className="d-lg-block position-sticky end-0" style={{top: '80px', alignSelf: 'flex-start'}} >
				<div className="card">
					<div className="card-header">
						<div className="">
							<h3>{props?.job.title}</h3>
							<strong>{props.company}</strong>
						</div>
						
						<div className="d-flex">
							<div>
								<div>
									<strong>{props?.job.location}</strong>
								</div>
								
								<div>
									<strong>{props?.job.job_type}</strong>
								</div>
							</div>

							<div className="ms-auto">
								<Link to="/apply" state={{job: props.job}}><button className="btn btn-secondary">Apply</button></Link>
							</div>
						</div>
					</div>
				
					<div className="card-body overflow-auto position-sticky" style={{height: '400px'}}>
						<div dangerouslySetInnerHTML={{__html:props.job.description}}></div>

						<div dangerouslySetInnerHTML={{__html:props.job.responsibilities}} />

						<div dangerouslySetInnerHTML={{__html:props.job.requirements}} />

						<span> Salary:<b> {props?.job.salary} </b></span>
						<br />
						<span>Ability to <b>relocate</b></span>
					</div>
				</div>
			</div>
		</div>
		
	)
}

export default SingleJob;