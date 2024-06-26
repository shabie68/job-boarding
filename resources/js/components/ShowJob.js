import {Link, useLocation} from "react-router-dom";

import {useState, useEffect} from 'react'
import SingleJob from './SingleJob'
import apiClient from '../services/apiClient';

function ShowJob() {
    const location = useLocation();
    const [success, setSuccess] = useState(false)

    const [jobs, setJobs] = useState([]);
    const [role, setRole] = useState(0);

    const [job, setJob] = useState(null);
    const [addJob, setAddJob] = useState(false)
    const [jobTitle, setJobTitle] = useState('')
    const [jobType, setJobType] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [nextPage, setNextPage] = useState(null)
    const [lastPage, setLastPage] = useState(1);
    const [company, setCompany] = useState();


    const next = () => {
        setCurrentPage(currentPage + 1);
    };

    const prev = () => {
        setCurrentPage(currentPage - 1);
    };

    function getJobs(search = false) {

      let baseUrl = 'http://127.0.0.1:8000/api/show-jobs';
      let getJobsUrl = !jobTitle ? `?page=${currentPage}` : `?title=${encodeURIComponent(jobTitle)}&page=${currentPage}`
       apiClient.get('http://127.0.0.1:8000/api/show-jobs'+getJobsUrl)
        .then(function(response) {
            setJobs(response.data.jobs.data)
            setNextPage(response.data.jobs.next_page_url)
            setLastPage(response.data.jobs.last_page)
            setJob(response.data.jobs.data[0])
            setRole(response.data.role)
            setCompany(response.data.company)
            if(search) {
              setCurrentPage(1)
            }

        })
    }

    useEffect(() => {
      if(currentPage) {
        getJobs()
      }

      setSuccess(location.state?.addJob)
      setTimeout(() => {
        setSuccess(false)
      }, 3000)



    }, [currentPage])

    async function getJob(id) {

        const response = await fetch('http://127.0.0.1:8000/api/single-job/'+id);
        const _job = await response.json();

        apiClient.get('http://127.0.0.1:8000/api/single-job/'+id)
        .then(function(response) {
            setJob(response.data.job)
            document.querySelector('.jb-single-job').classList.remove('d-sm-none')
            document.querySelector('.jb-jobs').classList.add('jb-all-jobs')
            document.querySelector('.jb-add-job-btn').classList.add('d-sm-none')

        })
    }


    async function filterJobs() {
      apiClient.get('http://127.0.0.1:8000/api/filter-jobs?title='+encodeURIComponent(jobTitle)+'&page='+currentPage)
        .then(function(response) {
            setJobs(response.data.jobs.data)
            setNextPage(response.data.jobs.next_page_url)
            setLastPage(response.data.jobs.last_page)
        })
    }



    return(
        <div>
            <div className="d-sm-block d-lg-flex justify-content-lg-center">
                <div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                            </svg>
                          </span>
                        </div>

                        <input
                          className="form-control"
                          value={jobTitle}
                          placeholder="Job title"
                          aria-describedby="basic-addon1"
                          onChange={(e)=>{setJobTitle(e.target.value)}}
                        />

                       <button className="btn btn-secondary" onClick={() => getJobs(true, 'first-time')}>Search Job</button>
                    </div>

                </div>

                <div className="">

                </div>
            </div>

            {
              success ?
              <div className="text-success text-center" style={{backgroundColor: '#c3ff624d', padding: '8px 0'}}>
                Job Created Successfully!
              </div>
              :''
            }

            <div className="my-5">
                <div>

                    {
                        role == 1 ?

                        <div className="d-lg-flex justify-content-lg-between my-4 border-bottom">
                            <h1 className="mb-0">Jobs</h1>
                             <div className="">
                                <Link to="/add-job">
                                    <button type="button" className="btn btn-primary mb-4">
                                        Add Job
                                    </button>
                                </Link>
                            </div>
                        </div>
                        : ''
                    }


                    <div className="d-sm-block d-lg-flex gap-3">
                         <div className="w-40 jb-sm-card-w jb-lg-card-w jb-jobs">
                            {jobs.map(_job => (

                               <div className={`card mb-4 ${job?.id === _job.id ? "border border-primary" : ""}`}  key={"job-"+_job.id} style={{cursor: 'pointer'}}
                               onClick={()=> {getJob(_job.id)}}>
                                <div className="d-flex card-header align-items-center">
                                    <h3 className="">{_job.title}</h3>
                                    <strong className="ml-end" style={{marginLeft: 'auto'}}>{company}</strong>
                                </div>

                                 <div className="card-body">
                                     <p>Will join the startup and design the website for startup. You will work with Eurpean clients</p>

                                    <div dangerouslySetInnerHTML={{__html: _job?.description}}></div>

                                    <div dangerouslySetInnerHTML={{__html: _job?.responsibilities}} />

                                    <div dangerouslySetInnerHTML={{__html: _job?.requirements}} />
                                 </div>
                             </div>
                             ))}


                             <div className="d-flex gap-2 align-items-center">
                               <button className="btn btn-link"  onClick={prev} disabled={currentPage === 1} style={{border: '1px solid lightslategrey'}}>

                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                                  <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                                </svg>
                               </button>

                               <span>
                                Showing page {currentPage} of {lastPage}
                               </span>

                              <button className="btn btn-link" onClick={next} disabled={!nextPage} style={{border: '1px solid lightslategrey'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                                  <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                                </svg>
                              </button>
                            </div>
                         </div>

                        {job ?
                            <>
                             <SingleJob job={job} company={company}/>
                             </>
                             : ''
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ShowJob
