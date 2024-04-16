import {useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import apiClient from '../services/apiClient';

function Company() {

	const [companies, setCompanies] = useState([]);
	const [nextPage, setNextPage] = useState(null)
	const [lastPage, setLastPage] = useState(1);
	const [role, setRole] = useState(0);

	useEffect(() => {
		getCompanies()
	}, [])

	function getCompanies() {

	  // let getJobsUrl = !jobTitle ? `?page=${currentPage}` : `?title=${encodeURIComponent(jobTitle)}&page=${currentPage}`

	   apiClient.get('http://127.0.0.1:8000/api/company/show-companies')
		.then(function(response) {
			setCompanies(response.data.companies)
			setRole(response.data.role)
		})
		.catch((error) => {

		})
	}

	return(
		<div>
			<div className="my-5">
				<div>
					{role == 1 ?
						<div className="d-flex justify-content-between align-items-center my-4 border-bottom">
						  <h4 className="mb-0">Add New Company </h4>
						   <div className="">
							  <Link to="/add-company">
								  <button type="button" className="btn btn-primary mb-4">Add Company</button>
							  </Link>
						  </div>
					  	</div>
					  	: ''
					}
				  	

				  	<div className="">
						<div className="row gap-3">
							{companies?.map(company => (

								 <div className="mb-4 col-3 bg-white rounded border-white"  key={"company--"+company.id}>
									<div className="d-flex gap-4 align-items-center">
									  <div className="w-25">
										<img src={'uploads/images/' + company.logo} className="w-100" />
									  </div>

									  <div className="w-75">
										<h3 className="">{company.title}</h3>
										 <div className="">
											<p>{company.title}</p>
										 </div>

										  {!company.feedback
										?
										<button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target={"#exampleModal-"+company.id}>Add Review</button>
										: ''

									  }
									  </div>
									</div>


									<div className="modal fade" id={"exampleModal-"+company.id} tabindex="-1" aria-labelledby={"exampleModalLabel-"+company.id} aria-hidden="true">
									  <div className="modal-dialog">
										<div className="modal-content">
										  <div className="modal-header">
											<h1 className="modal-title fs-5" id={"exampleModalLabel-"+company.id}>Modal title</h1>
											<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
										  </div>
										  <div className="modal-body">
											{company.id} is the id 
										  </div>
										  <div className="modal-footer">
											<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
											<button type="button" className="btn btn-primary">Save changes</button>
										  </div>
										</div>
									  </div>
									</div>
								  </div>
						 	))}

							<div className="d-flex gap-2 align-items-center">
							   <button className="btn btn-link" style={{border: '1px solid lightslategrey'}}>

								  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
								  <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
								</svg>
							   </button>

							   <span>
								Showing page 
							   </span>

							  <button className="btn btn-link" style={{border: '1px solid lightslategrey'}}>
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
								  <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
								</svg>
							  </button>
							</div>
						</div>
				  	</div>
		  		</div>
			</div>
		</div>
	)
}

export default Company;