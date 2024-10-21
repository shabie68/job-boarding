import {Link} from 'react-router-dom'
import react from 'react'
function SingleJob(props) {

	 function handleNavigation() {
        
        // document.querySelector('.jb-single-job')?.classList.add('d-sm-none')
        // document.querySelector('.jb-jobs')?.classList.remove('jb-all-jobs')
        // document.querySelector('.jb-add-job-btn')?.classList.remove('d-sm-none')
        document.querySelector('.jb-single-job')?.classList.add('bj-d-sm-none')
        document.querySelector('.jb-jobs')?.classList.remove('jb-all-jobs')
        document.querySelector('.jb-add-job-btn')?.classList.remove('bj-d-sm-none')
    }

   	
   	const [appliedJobs, setAppliedJobs] = react.useState([]);

   	const checkForAppliedJobs = () => {

      
      let total = props.submissions?.filter((submission) => {
        return submission.user_id == props.authenticatedUser && submission.board_job_id === props.job.id
      })



    }

    react.useEffect(() => {
    	checkForAppliedJobs()

    }, [props.job])

	return (
		<div className="jb-single-job w-lg-50 bj-d-sm-none d-lg-block">
			
			<div onClick={handleNavigation} className="mb-3 jb-back-btn jb-back-sm-btn bj-gap-8">

                <svg style={{ color: 'black' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
		            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
	          	</svg>
                <strong>Go back</strong>
            </div>

			<div className="d-lg-block position-sticky end-0" style={{top: '80px', alignSelf: 'flex-start'}} >
				<div className="card bg-one gorgeous-b-dashed">
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

							{
								appliedJobs?.length < 1 && props.authenticatedUser!=props.job.user_id ?
								<div className="ms-auto">
									<Link to="/apply" state={{job: props.job}}><button className="btn bj-btn-prime text-prime">Apply</button></Link>
								</div>	
								:
								<div className="ms-auto">
									<button className="btn bj-btn-prime text-prime" disabled>Apply</button>
								</div>
							}

							<div className="ms-auto">
								<Link to="/apply" state={{job: props.job}}><button className="btn bj-btn-prime text-prime">Apply</button></Link>
							</div>	
						</div>
					</div>
				
					<div className="card-body bg-one overflow-auto position-sticky" style={{height: '400px'}}>
						<div dangerouslySetInnerHTML={{__html:props.job.description}}></div>

						<div dangerouslySetInnerHTML={{__html:props.job.responsibilities}} />

						<div dangerouslySetInnerHTML={{__html:props.job.requirements}} />

						<span> Salary:<b> {props?.job.salary} </b></span>
						<br />
						<span>Ability to <b>relocate</b></span>
					</div>

					{
						appliedJobs?.map((jo) => (
							<div key={jo.id}>
								<p>{jo.title}</p>
							</div>
						))
					}
				</div>
			</div>
		</div>
		
	)
}

export default SingleJob;