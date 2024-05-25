import {useState, useEffect, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import BoardJobContext from '../contexts/BoardJobContext.js'
import apiClient from '../services/apiClient'
import { useFormik } from 'formik';



const validate = values => {
  const errors = {};

  if (!values.salaryExpectation) {
    errors.salaryExpectation = 'Salary expectation field is required';
  }

  if (!values.noticePeriod) {
    errors.noticePeriod = 'Notice period field is required';
  }

  return errors;
};


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
        // props.updateJobContext({user_id: response.submission.user_id, board_job_id: response.submission.board_job_id, submission: response.data.submission})
    }, [])

      const formik = useFormik({
        initialValues: {
          country: 'pakistan',
          state: 'islamabad',
          abilityToCommute: '',
          salaryExpectation: '',
          noticePeriod: '',
          scheduleInterview: ''
        },

        validate,

        onSubmit: values => {

          apiClient.put('http://127.0.0.1:8000/api/apply/candidate/'+context.user_id + '/job/' + context.board_job_id, {
                ability_to_commute: formik.values.abilityToCommute,
                salary_expectation: formik.values.salaryExpectation,
                notice_period: formik.values.noticePeriod,
                schedule_interview: formik.values.scheduleInterview,
                country: formik.values.country,
                state: formik.values.state,
                submission: JSON.stringify(context.submission)
            })
            .then((response) => {

                window.location = '/home'
            })
            .catch((error) => {

            })


        },
      });

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
            <div className="progress mb-4" style={{height: '7px'}}>
              <div className="progress-bar" id="jb-question-pbar" role="progressbar" style={{width: "100%"}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
            </div>

			<div className="w-50" style={{margin: '0 auto'}}>
				<h2>Miscelleneous</h2>
                 <form onSubmit={formik.handleSubmit}>
    				<div className="card">
    					<div className="card-body">
                           
                            <div className="">
                                <div className="">
                                    <label htmlFor="country" className="col-form-label"><b>Country</b></label>
                                    <select name="country" className="form-control" value={formik.values.country} onChange={formik.handleChange}>
                                        <option value="pakistan">Pakistan</option>
                                        <option value="india">India</option>
                                        <option value="germany">Germany</option>
                                    </select>
                                </div>
                            </div>

                            <div className="">
                                <label htmlFor="state" className="col-form-label"><b>State|City</b></label>
                                <div className="">


                                    <select className="form-control" name="state" value={formik.values.state} onChange={formik.handleChange}>
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
                                {formik.values.abilityToCommute} is the alue
                                <div className="d-flex">
                                    <div>
                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                            No
                                        </label>
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="abilityToCommute"
                                            id="flexRadioDefault2"
                                            value="no"
                                            onChange={formik.handleChange}
                                            checked = {formik.values.abilityToCommute == 'no' ? 'checked' : ''}
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
                                            name="abilityToCommute"
                                            id="flexRadioDefault1"
                                            onChange={formik.handleChange}
                                            checked = {formik.values.abilityToCommute == 'yes' ? 'checked' : ''}
                                        />

                                    </div>
                                </div>
                            </div>

                            <div className="">

                                <label htmlFor="first-name" className="col-form-label"><b>Salary Expectation</b></label>
                                <div className="">
                                    <input
                                        type="number"
                                        name="salaryExpectation"
                                        value={formik.values.salaryExpectation}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        required
                                        className="form-control"
                                    />
                                </div>

                                {formik.touched.salaryExpectation && formik.errors.salaryExpectation ? (
                                  <div className="text-danger">{formik.errors.salaryExpectation}</div>
                                ) : null}
                            </div>

                            <div className="">

                                <label htmlFor="first-name" className="col-form-label"><b>Notice Period: (days)</b></label>
                                <div className="">
                                    <input
                                        type="number"
                                        name="noticePeriod"
                                        value={formik.values.noticePeriod}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        required
                                        className="form-control"
                                    />
                                </div>

                                {formik.touched.noticePeriod && formik.errors.noticePeriod ? (
                                  <div className="text-danger">{formik.errors.noticePeriod}</div>
                                ) : null}
                            </div>

                            <div className="">
                            	<p>Tell us few dates where you are free</p>
                                <label htmlFor="first-name" className="col-form-label"><b>Interview Date </b></label>
                                <div className="">
                                    <input
                                        type="date"
                                        name="scheduleInterview"
                                        value={formik.values.scheduleInterview}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        required
                                        className="form-control"
                                    />
                                </div>
                            </div>
    					</div>
    				</div>

                    <div className="mt-2 mb-4 text-end">
                        <button type="button" className="btn btn-primary" type="submit">Continue</button>
                    </div>
                </form>

		    </div>
        </div>
	)
}

export default JobQuestions;
