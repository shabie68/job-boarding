import {Link} from 'react-router-dom'
function SingleJob(props) {

	
	//create dummy record for the user and job board
	return (
		<div className="w-50 position-sticky end-0" style={{top: '80px', alignSelf: 'flex-start'}} >
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
	)
}

export default SingleJob;