import {Link, useLocation} from "react-router-dom";

import {useState, useEffect, useContext} from 'react'
import SingleJob from './SingleJob'
import apiClient from '../services/apiClient';
import MessageContext from '../contexts/MessageContext';
import Pusher from 'pusher-js';
// import {Pusher} from 'https://js.pusher.com/8.0.1/pusher.min.js'



function ShowJob(props) {
    const location = useLocation();
    const [success, setSuccess] = useState(false)
    const [userName, setUserName] = useState("")
    const [receivedMessages, setReceivedMessages] = useState([])
    const [recepient, setRecepient] = useState(companies ? companies[0].id : null)
    const [userId, setUserId] = useState(-1)
    const [showMessage, setShowMessage] = useState(false)

    const [isMsgReceived, setIsMsgRecevied] = useState(false)
    const [senderName, setSenderName] = useState('')
    const [candidates, setCandidates] = useState([
    {
      name: 'Default',
      id: -1
    }
    ])

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
    const [users, setUsers] = useState([])

    const [selectedUser, setSelectedUser] = useState(1);
    const [authenticatedUser, setAuthenticatedUser] = useState(-1)
    const [message, setMessage] = useState('')
    const [companies, setCompanies] = useState([])
    const [submissions, setSubmissions] = useState([])

    const msgContext = useContext(MessageContext)

    let messages = [];


      const value = `; ${document.cookie}`
      const parts = value.split(`; XSRF-TOKEN=`)
      const xsrfToken = parts.pop().split(';').shift()
      // const pusher = new Pusher('de34f80f0848257e88e9', {
      //   cluster: 'ap2',
      //   encrypted: true,
      //    authEndpoint: 'api/broadcasting/auth',
      //    withCredentials: true,
      //   enableStats: false,
      //   enabledTransports: ['ws', 'wss'],
      //          auth: {
      //           headers: {
      //       'X-XSRF-TOKEN':decodeURIComponent(xsrfToken),
      //     },

      //   }
      // });


      const channelSubscription = () => {
        let channel = pusher.subscribe('private-msg.' + selectedUser)
        return channel
      }

      function startChat() {

         apiClient.post('http://127.0.0.1:8000/api/start-chat/', {
          id: selectedUser,
          message: message
         })
         .then((data) => {

           setMessage('')
         })

      }

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


          // if(!jobTitle) {
            const pusher = new Pusher('de34f80f0848257e88e9', {
              cluster: 'ap2',
              encrypted: true,
               authEndpoint: 'api/broadcasting/auth',
               withCredentials: true,
              enableStats: false,
              enabledTransports: ['ws', 'wss'],
                     auth: {
                      headers: {
                  'X-XSRF-TOKEN':decodeURIComponent(xsrfToken),
                },

              }
            });
          // }
            
            setJobs(response.data.jobs.data)
            setNextPage(response.data.jobs.next_page_url)
            setLastPage(response.data.jobs.last_page)
            setJob(response.data.jobs.data[0])
            setRole(response.data.role)
            setCompany(response.data.company)
            setUsers(response.data.users)
            setAuthenticatedUser(response.data.authenticatedUser)
            if(search) {
              setCurrentPage(1)
              return
            }

            setUserName(response.data.name)
            let submissions = [];
            if(!search) {
              setSubmissions(response.data.submissions)  
              response.data.submissions?.map((_submission) => {
                let user = {
                  id: _submission.id,
                  name: _submission.first_name
                }

                // submissions.push(user)
                
                setCandidates((prevCandidates) => [...prevCandidates, user])

              })

            }
            

            const channel = pusher.subscribe('private-company.'+response.data.company_id )
            channel.bind('Illuminate\\Notifications\\Events\\BroadcastNotificationCreated', function(data) {
                alert("GOOD NEWS")

                setCandidates((prevCandidates) => [...prevCandidates, data['user']])
                setReceivedMessages((prevMessages) => [...prevMessages, data['message']] );
                // messages.push(data['message'])
                setUserId(data['user']['id'])

                // props.updateMessageContext((prevMessages) => [...prevMessages, data['message']])
                 props.updateMessageContext((prevObj) => [...prevObj, {senderName: data['user']['name'], message: data['message']}])

                // props.updateJobContext({user_id: null, board_job_id: null, submission: null, message: data})
                props.updateJobContext({user_id: data['user']['id'], board_job_id: null, submission: null, message: data['messages']})
                setSenderName(data['user']['name'])
            })

            // // const msgChannel = pusher.subscribe('private-msg.' + response.data.authenticatedUser)
            // const msgChannel = pusher.subscribe('private-msg.' + response.data.authenticatedUser)
            // msgChannel.bind('msg-event', (data) => {
            //   console.log(data['message'])
            //   // setReceivedMessage(data['message'])
            //   setReceivedMessage((prevMessages) => [...prevMessages, data['message']]);
            //   setIsMsgRecevied(true)
            //   console.log(data)
            //   setSenderName(data['name'])
            // })



            if(response.data.role == 2) {
              setCompanies(response.data.companies)
              const candidateChannel = pusher.subscribe('private-candidate.' + response.data.authenticatedUser)
              console.log("HER IS THE channel")
              console.log(candidateChannel)
              candidateChannel.bind('job-msg', (data) => {
             
                messages.push(data['message'])
                alert("WE ARE HERE")

                setReceivedMessages((prevMessages) => [...prevMessages, data['message']]);
                // props.updateMessageContext((prevMessages) => [...prevMessages, data['message']])
                 props.updateMessageContext((prevObj) => [...prevObj, {senderName: data['user']['name'], message: data['message']}])

                  setSenderName(data['user']['name'])
                  // props.updateJobContext({user_id: null, board_job_id: null, submission: null, message: data})
                  props.updateJobContext({user_id: data['user']['id'], board_job_id: null, submission: null, message: messages})
              })
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

      if(role == 1) {
        setCandidates((prevCandidates) => [...prevCandidates, {user_id: userId, name: senderName}])
      }



    }, [currentPage, selectedUser])

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

    const sendMessage = (company_id) => {
      if(!company_id) {
        company_id = companies[0]?.id
      }

      if(company_id < 1) {
        setMessage('')
        return
      }

      setReceivedMessages((prevMessages) => [...prevMessages, message])
      // props.updateMessageContext((prevMessages) => [...prevMessages, message])
      props.updateMessageContext((prevObj) => [...prevObj, {senderName: 'You', message: message}])
      apiClient.post('http://127.0.0.1:8000/api/send-msg/', {
          id: Number(company_id),
          message: message
         })
    .then((res) => {


       setMessage('')
    })
  }

    return(
        <div>

            {
              success ?
              <div className="text-success text-center" style={{backgroundColor: '#c3ff624d', padding: '8px 0'}}>
                Job Created Successfully!
              </div>
              :''
            }

            <div className="my-4">
              <div className="d-sm-block d-lg-flex justify-content-lg-center">
                <div className="d-flex ">
                    
                    <span>
                      <input
                        className="bj-input bg-one"
                        value={jobTitle}
                        placeholder="Job title"
                        aria-describedby="basic-addon1"
                        onChange={(e)=>{setJobTitle(e.target.value)}}
                      />
                    </span>

                    <span><button className="bj-btn bj-btn-prime text-prime" onClick={() => getJobs(true, 'first-time')}>Search Job</button></span>
                </div>
              </div>
              
              <div>
                {
                  role == 1 ?

                    <div className="d-lg-flex justify-content-lg-between my-4 border-bottom">
                        <h1 className="mb-0 text-two">Jobs</h1>
                         <div className="">
                            <Link to="/add-job">
                                <button type="button" className="btn bj-btn-secondary text-prime mb-3">
                                    Add Job
                                </button>
                            </Link>
                        </div>
                    </div>
                    : ''
                  }
                  
                  <div className="d-sm-block d-lg-flex gap-3">
                       <div className="w-40 jb-sm-card-w bg-one jb-lg-card-w jb-jobs">
                          {jobs.map(_job => (

                             <div className={`card bg-one mb-3 ${job?.id === _job.id ? "bj-border" : ""}`}  key={"job-"+_job.id} style={{cursor: 'pointer'}}
                             onClick={()=> {getJob(_job.id)}}>
                              <div className="card-header">
                                  
                                  <div className="d-flex justify-content-between">
                                    <h3 className="">{_job.title}</h3>
                                    <img src={'/uploads/images/' + _job.company?.logo} className="bj-w-10" />
                                  </div>
                                  <strong>{_job?.company?.title}</strong>
                              </div>

                               <div className="card-body">
                                   

                                  <div dangerouslySetInnerHTML={{__html: _job?.description}}></div>

                                  <div dangerouslySetInnerHTML={{__html: _job?.responsibilities}} />

                                  <div dangerouslySetInnerHTML={{__html: _job?.requirements}} />
                               </div>
                           </div>
                           ))}


                           <div className="d-flex gap-2 align-items-center">
                             <button className="btn bj-btn-prime btn-link"  onClick={prev} disabled={currentPage === 1} style={{border: '1px solid lightslategrey'}}>

                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                              </svg>
                             </button>

                             <span>
                              Showing page {currentPage} of {lastPage}
                             </span>

                            <button className="btn bj-btn-prime btn-link" onClick={next} disabled={!nextPage} style={{border: '1px solid lightslategrey'}}>
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


                {
                  !showMessage ?
                  <div className="position-fixed bg-three" style={{bottom: 20, borderRadius: '50%', padding: '4px', right: '50px', zIndex: 9, cursor: 'pointer'}} onClick={() => {setShowMessage(true)}}>
                    
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 11H8.01M12 11H12.01M16 11H16.01M21 20L17.6757 18.3378C17.4237 18.2118 17.2977 18.1488 17.1656 18.1044C17.0484 18.065 16.9277 18.0365 16.8052 18.0193C16.6672 18 16.5263 18 16.2446 18H6.2C5.07989 18 4.51984 18 4.09202 17.782C3.71569 17.5903 3.40973 17.2843 3.21799 16.908C3 16.4802 3 15.9201 3 14.8V7.2C3 6.07989 3 5.51984 3.21799 5.09202C3.40973 4.71569 3.71569 4.40973 4.09202 4.21799C4.51984 4 5.0799 4 6.2 4H17.8C18.9201 4 19.4802 4 19.908 4.21799C20.2843 4.40973 20.5903 4.71569 20.782 5.09202C21 5.51984 21 6.0799 21 7.2V20Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                  </div>
                  :
                  <div className="card position-fixed bg-one w-25" style={{bottom: '20px', right: '50px', zIndex: 9, height: '50%', overflow: 'auto'}}>
                  <div className="card-header position-sticky top-0 bg-two text-prime">
                    <div className="d-flex">
                      <div>
                         Chat Messages
                      </div>
                      <div style={{marginLeft: 'auto', cursor: 'pointer'}} onClick={()=>{setShowMessage(false)}}>
                       <svg viewBox="0 0 24 24" height="16" width="16" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clip-Rule="evenodd" d="M6.00001 11.25L18 11.25L18 12.75L6.00001 12.75L6.00001 11.25Z" fill="#ffffff"></path> </g></svg>
                      </div>
                    </div>
                    
                   
                  </div>

                  <div className="card-body">
                    {
                      role == 2 ?
                      <select  onChange={(e) => {setRecepient(e.target.value)}}>
                      {
                        companies.map((company) => (
                        <option value={company.id}>{company.title}</option>

                        ))
                      }
                    </select>

                    :

                    (
                      <select defaultValue={userId} onChange={(e) => {setUserId(e.target.value)}}>
                        {
                          candidates?.map((candidate) => (
                          <option value={candidate.id}>{candidate.name}</option>
                          ))
                        }
                      </select>
                    )}
                    

                    {
                      msgContext?.map((msg) => (
                      <>
                        <div className="my-2"><strong>{msg.senderName}</strong></div>
                        <div>{msg.message}</div>
                      </>
                      ))
                    }

                  </div>

                  <div className="card-footer p-3 bg-one">

                  <strong><label>Your message </label></strong>
                    <div className="">
                      
                      <textarea className="w-100" onChange={(e) => {setMessage(e.target.value)}} value={message}>
                      </textarea>
                    </div>



                    <div className="d-flex justify-content-end">
                      <button className="btn bj-btn-prime text-prime" onClick={() => {sendMessage( role == 1 ? userId : recepient)}}>Send</button>
                    </div>
                  </div>
                </div>
              }
            </div>
        </div>
    )
}
/**
Below are the three colors that will be used in your website
#4f4a47 primary color
#238a85 secondary color
#f7fffe background color

Todos
1) Check for spacing i.e padding/margin/gap. Use consistent spacing
2) Check for font sizes. Use consistent font sizes
3) Add images to job title................done
4) Check for text color. Text color should be brown-black
5) Add accept/reject canidate column(send message for accepted candidate)




**/

export default ShowJob
