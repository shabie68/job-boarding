import {useState, useEffect, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import BoardJobContext from '../contexts/BoardJobContext.js'
import apiClient from '../services/apiClient'



function JobQuestions() {

	const navigate = useNavigate();
    const context = useContext(BoardJobContext)
    const [country, setCountry] = useState('pakistan');
    const [state, setState] = useState();
	const [abilityToCommute, setAbilityToCommute] = useState('No');
	const [salaryExpectation, setSalaryExpectation] = useState(40000);
	const [noticePeriod, setNoticePeriod] = useState(10);
	const [scheduleInterview, setScheduleInterview] = useState('2024-04-11');

    useEffect(() => {
        setCountry(context.submission.country)
        setState(context.submission.state)
        setAbilityToCommute(context.submission.ability_to_commute)
        setSalaryExpectation(context.submission.salary_expectation)
        setNoticePeriod(context.submission.notice_period)
        setScheduleInterview(new Date(context.submission.schedule_interview).toISOString().split('T')[0])
    }, [])

	const saveData = () => {

		apiClient.put('http://127.0.0.1:8000/api/apply/candidate/'+context.user_id + '/job/' + context.board_job_id, {
			ability_to_commute: abilityToCommute,
			salary_expectation: salaryExpectation,
			notice_period: noticePeriod,
			schedule_interview: scheduleInterview,
            country: country,
            state: state,
            submission: JSON.stringify(context.submission)		
		})
		.then((response) => {
			window.location = '/home'
		})
		.catch((error) => {

		})
	}


	return (
		<div>
			<div className="w-50" style={{margin: '0 auto'}}>
				<h4>Upload your resume</h4>
				<div className="card">	
					<div className="card-body">

                        <div className="">

                            <div className="">
                               
                                <label htmlFor="country" className="col-form-label"><b>Country</b></label>
                                <select className="form-control" value={country} name="type" onChange={(e) => {setCountry(e.target.value)}}>
                                    <option value="pakistan">Pakistan</option>
                                    <option value="india">India</option>
                                    <option value="germany">Germany</option>
                                </select>
                            </div>
                        </div>

                        <div className="">
                            <label htmlFor="state" className="col-form-label"><b>State|City</b></label>
                            <div className="">
                                

                                <select className="form-control" name="type" value={state} onChange={(e) => {setState(e.target.value)}}>
                                    {country == 'pakistan' ? 
                                        <>
                                            <option value="hangu">Hangu</option>
                                            <option value="islamabad">Islamabad</option>
                                            <option value="peshawar">Peshawar</option>
                                        </>
                                    :
                                    <>
                                        <option value="berlin">Berlin   </option>
                                        <option value="mumbai">mumbai</option>
                                        <option value="manchester">manchester</option>
                                    </>
                                }
                                    
                                </select>
                            </div>
                        </div>

						<div className="">

                            <label htmlFor="first-name" className="col-form-label"><b>Planning to relocate</b></label>
                            <div className="d-flex">
                                <div>
                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                        No
                                    </label>
                                    <input 
                                        className="form-check-input" 
                                        type="radio" 
                                        name="ability-to-commute" 
                                        id="flexRadioDefault2" 
                                        value="no"
                                        onChange={e => setAbilityToCommute(e.target.value)}
                                        checked = {abilityToCommute == 'no' ? 'checked' : ''}
                                    />
                                </div>

                                <div>
                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                        Yes
                                    </label>
                                    <input 
                                        className="form-check-input" 
                                        type="radio" 
                                        value="yes" 
                                        name="ability-to-commute" 
                                        id="flexRadioDefault1"
                                        onChange={e => setAbilityToCommute(e.target.value)}
                                        checked = {abilityToCommute == 'yes' ? 'checked' : ''}
                                    />
                                      
                                </div>
                            </div>
                        </div>

                        <div className="">

                            <label htmlFor="first-name" className="col-form-label"><b>Salary Expectation</b></label>
                            <div className="">
                                <input
                                    type="number"
                                    name="salary-expectation"
                                    value={salaryExpectation}
                                    onChange={e => setSalaryExpectation(e.target.value)}
                                    required
                                    className="form-control"
                                />
                            </div>
                        </div>

                        <div className="">

                            <label htmlFor="first-name" className="col-form-label"><b>Notice Period: (days)</b></label>
                            <div className="">
                                <input
                                    type="number"
                                    name="first-name"
                                    value={noticePeriod}
                                    onChange={e => setNoticePeriod(e.target.value)}
                                    required
                                    className="form-control"
                                />
                            </div>
                        </div>

                        <div className="">
                        	<p>Tell us few dates where you are free</p>
                            <label htmlFor="first-name" className="col-form-label"><b>Interview Date </b></label>
                            <div className="">
                                <input
                                    type="date"
                                    name="interview-date"
                                    value={scheduleInterview}
                                    onChange={e => setScheduleInterview(e.target.value)}
                                    required
                                    className="form-control"
                                />
                            </div>
                        </div>


						<div className="mt-2 text-align-end">
                            <button type="button" className="btn btn-primary" onClick={saveData}>Continue</button>
                        </div>
					</div>
				</div>
			</div>

		</div>
	)
}

export default JobQuestions;