function SingleJob(props) {

	return (
		<div className="w-50 position-sticky end-0" style={{top: '80px', alignSelf: 'flex-start'}} >
			<div className="card">
				<div className="card-header">
					<h3>{props?.job.title}</h3>
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
							<button className="btn btn-secondary" onClick={()=>{alert("HI")}}>Apply</button>
						</div>
					</div>
				</div>
			
				<div className="card-body overflow-auto position-sticky" style={{height: '400px'}}>
					<p>{props?.job.description}</p>

					<strong>Job Responsibilities</strong>
					<p>{props?.job.job_responsibilities}</p>

					<strong>JOBING******</strong>
					<div dangerouslySetInnerHTML={{__html:props.job.job_responsibilities}} />

					<span> Salary:<b> {props?.job.salary} </b></span>
					<br />
					<span>Ability to <b>relocate</b></span>
				</div>
			</div>
		</div>
	)
}

export default SingleJob;