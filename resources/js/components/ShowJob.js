import {
  BrowserRouter as Router,
  
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import {useState, useEffect} from 'react'
import AddJob from './AddJob'
import SingleJob from './SingleJob'
import apiClient from '../services/apiClient';

function ShowJob() {


    const [addJob, setAddJob] = useState(false)
    const [jobs, setJobs] = useState([]);
    const [job, setJob] = useState(null);

    function getJobs() {
       apiClient.get('http://127.0.0.1:8000/api/show-jobs')
        .then(function(response) {
            console.log("RESPONSE")
            console.log(response)
            setJobs(response.data.jobs)
        })
      
    }

    useEffect(() => {
        getJobs()

    }, [])

    async function getJob(id) {
        
        const response = await fetch('http://127.0.0.1:8000/api/single-job/'+id);
        const _job = await response.json();

        apiClient.get('http://127.0.0.1:8000/api/single-job/'+id)
        .then(function(response) {
            console.log("RESPONSE")
            console.log(response)
            setJob(response.data.job)
        })

        

    }


    return(
        <div>

                {addJob ? 

             <AddJob/>
             : 
             <div className="d-flex gap-3">
                 <div className="w-40" style={{width: '45%'}}>
                     {jobs.map(_job => (

                       <div className={`card mb-4 ${job?.id === _job.id ? "border border-primary" : ""}`}  key={"job-"+_job.id} style={{cursor: 'pointer'}}
                       onClick={()=> {getJob(_job.id)}}>
                         <h3 className="card-header">{_job.title}</h3>
                         <div className="card-body">
                             <p>Will join the startup and design the website for startup. You will work with Eurpean clients</p>
                             <ul>
                                 <li><h4>Description:</h4>{_job.description}</li>
                                 <li><h4>Responsibilities</h4>{_job.job_responsibilities}</li>
                                 <li><h4>Requirements</h4>{_job.job_requirements}</li>
                             </ul>
                         </div>
                     </div>
                     ))}
                 </div>

                 {job ?
                     <SingleJob job={job} setAddJob={setAddJob}/>
                     : ''
                 }
                    
             </div>
            }
                
        </div>

         
        
    )
}

export default ShowJob

/**

// {addJob ? 

//              <AddJob/>
//              : 
//              <div className="d-flex gap-3">
//                  <div className="w-40" style={{width: '45%'}}>
//                      {jobs.map(_job => (

//                        <div className={`card mb-4 ${job?.id === _job.id ? "border border-primary" : ""}`}  key={"job-"+_job.id} style={{cursor: 'pointer'}}
//                        onClick={()=> {getJob(_job.id)}}>
//                          <h3 className="card-header">{_job.title}</h3>
//                          <div className="card-body">
//                              <p>Will join the startup and design the website for startup. You will work with Eurpean clients</p>
//                              <ul>
//                                  <li><h4>Description:</h4>{_job.description}</li>
//                                  <li><h4>Responsibilities</h4>{_job.job_responsibilities}</li>
//                                  <li><h4>Requirements</h4>{_job.job_requirements}</li>
//                              </ul>
//                          </div>
//                      </div>
//                      ))}
//                  </div>

//                  {job ?
//                      <SingleJob job={job} setAddJob={setAddJob}/>
//                      : ''
//                  }
                    
//              </div>
//             }
**/