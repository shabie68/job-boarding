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

    const [jobs, setJobs] = useState([]);
    const [job, setJob] = useState(null);
    const [addJob, setAddJob] = useState(false)

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
        <div className="my-4">
                <div>
                    <div className="d-flex justify-content-between">
                        <h4>Add New Job </h4>
                         <div className="">
                            <Link to="/add-job">
                                <button type="button" className="btn btn-primary">Add Job</button>
                            </Link>
                        </div>
                    </div>

                
                    <div className="d-flex gap-3">
                         <div className="w-40" style={{width: '45%'}}>
                             {jobs.map(_job => (

                               <div className={`card mb-4 ${job?.id === _job.id ? "border border-primary" : ""}`}  key={"job-"+_job.id} style={{cursor: 'pointer'}}
                               onClick={()=> {getJob(_job.id)}}>
                                 <h3 className="card-header">{_job.title}</h3>
                                 <div className="card-body">
                                     <p>Will join the startup and design the website for startup. You will work with Eurpean clients</p>
                                 
                                    <div dangerouslySetInnerHTML={{__html: _job?.description}}></div>

                                    <div dangerouslySetInnerHTML={{__html: _job?.responsibilities}} />

                                    <div dangerouslySetInnerHTML={{__html: _job?.requirements}} />
                                 </div>
                             </div>
                             ))}
                         </div>

                         {job ?
                            <>
                             <SingleJob job={job}/>
                             </>
                             : ''

                        }
                    </div>
                </div>
                
        </div>
    )
}

export default ShowJob
