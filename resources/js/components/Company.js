import {useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import apiClient from '../services/apiClient';

function Company() {

	const [companies, setCompanies] = useState([]);
	const [nextPage, setNextPage] = useState(null)
	const [lastPage, setLastPage] = useState(1);
	const [role, setRole] = useState(0);
	const [feedback, setFeedback] = useState({
		comment: '',
		rating: 0
	})
  const renderStars = (num) => {
    const stars = [];
    for (let i = 0; i < num; i++) {
    	console.log("START" + i)
      stars.push(
        <span key={i} style={{ color: 'orange' }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-star"
            viewBox="0 0 16 16"
          >
            <path
              d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"
            />
          </svg>
        </span>
      );
    }
    return stars;
  };
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



	function addReview(id) {

		apiClient.put('http://127.0.0.1:8000/api/company/add-review/'+id, {feedback: feedback})
		.then(function(response) {
			console.log(response)
			// document.getElementById('exampleModal-' + id).style.display = 'none'
			// setReviews(response.data.companies)
			// setRole(response.data.role)
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


									  <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target={"#exampleModal-"+company.id}>Add Review</button>
									  	Here it is 
									  	{renderStars(4)}
									  </div>
									</div>


									<div className="modal fade" id={"exampleModal-"+company.id} tabindex="-1" aria-labelledby={"exampleModalLabel-"+company.id} aria-hidden="true">
									  <div className="modal-dialog">
										<div className="modal-content">
										  <div className="modal-header">
											<h1 className="modal-title fs-5" id={"exampleModalLabel-"+company.id}> Add Review</h1>
											<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
										  </div>
										  <div className="modal-body">
										  	<div className="text-center">
										  		<h3>Review this company</h3>
										  		<span onClick={() => {setFeedback({...feedback, rating: 1})}} style={{color: 'blue'}}>
											  		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
													  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
													</svg>
												</span>

												<span onClick={() => {setFeedback({...feedback, rating: 2})}} style={{color: 'blue'}}>
											  		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
													  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
													</svg>
												</span>

												<span onClick={() => {setFeedback({...feedback, rating: 3})}} style={{color: 'blue'}}>
											  		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
													  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
													</svg>
												</span>

												<span onClick={() => {setFeedback({...feedback, rating: 4})}} style={{color: 'blue'}}>
											  		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
													  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
													</svg>
												</span>

												<span onClick={() => {setFeedback({...feedback, rating: 5})}} style={{color: 'blue'}}>
											  		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
													  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
													</svg>
												</span>
										  	</div>
											<div>
												<label>Feedback</label>
												<textarea type="text" name="title" className="form-control" rows="3" className="form-control" onChange={(e) => {setFeedback({...feedback, comment: e.target.value})}} defaultValue={feedback.comment}></textarea>
										
											</div>
										  </div>
										  <div className="modal-footer">
											<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
											<button type="button" className="btn btn-primary" onClick={() => {addReview(company.id)}}>Add review</button>
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