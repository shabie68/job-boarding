import {useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import apiClient from '../services/apiClient';

function Company() {

	const [companies, setCompanies] = useState([]);
	const [nextPage, setNextPage] = useState(null)
    const [lastPage, setLastPage] = useState(1);

    useEffect(() => {
    	getCompanies()
    }, [])

	function getCompanies() {

      // let getJobsUrl = !jobTitle ? `?page=${currentPage}` : `?title=${encodeURIComponent(jobTitle)}&page=${currentPage}`

       apiClient.get('http://127.0.0.1:8000/api/company/show-companies')
        .then(function(response) {
            setCompanies(response.data.companies)
            
        })
        .catch((error) => {

        })
    }


	return(
		<div>
			 <div className="my-5">
                <div>
                    <div className="d-flex justify-content-between align-items-center my-4 border-bottom">
                        <h4 className="mb-0">Add New Job </h4>
                         <div className="">
                            <Link to="/add-company">
                                <button type="button" className="btn btn-primary mb-4">Add Company</button>
                            </Link>
                        </div>
                    </div>

                    <div className="">
                         <div className="grid">
                            {companies?.map(company => (

                               <div className="card mb-4 g-col-6 g-col-md-4"  key={"company--"+company.id} style={{cursor: 'pointer'}}>
                                 <h3 className="card-header">{company.title}</h3>
                                 <div className="card-body">
                                     <p>{company.title}</p>
                                
                                    <div dangerouslySetInnerHTML={{__html: company?.description}}></div>

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