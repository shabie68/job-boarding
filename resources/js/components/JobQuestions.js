import {useState, useEffect, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import BoardJobContext from '../contexts/BoardJobContext.js'
import apiClient from '../services/apiClient'
import { useFormik } from 'formik';

import {getCountries} from '../countries'



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
    const [countries, setCountries] = useState(getCountries());
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
        let height = window.innerHeight;
        let menuHeight = document.querySelector('.menubar-links').offsetHeight;

        let footerHeight = document.querySelector('.bj-footer').offsetHeight;
        let containerHeight = 100 - (((menuHeight*100)/height) + ((footerHeight* 100)/height));

        document.querySelector('.container').style.minHeight = height - (menuHeight+footerHeight) + 'px'
        // props.updateJobContext({user_id: response.submission.user_id, board_job_id: response.submission.board_job_id, submission: response.data.submission})
    }, [])

      const formik = useFormik({
        initialValues: {
          country: 'pakistan',
          abilityToCommute: '',
          salaryExpectation: '',
          noticePeriod: '',
          scheduleInterview: ''
        },

        validate,

        onSubmit: values => {

          apiClient.post('http://127.0.0.1:8000/api/apply/candidate/'+context.user_id + '/job/' + context.board_job_id, {
                ability_to_commute: formik.values.abilityToCommute,
                salary_expectation: formik.values.salaryExpectation,
                notice_period: formik.values.noticePeriod,
                schedule_interview: formik.values.scheduleInterview,
                country: formik.values.country,
                submission: JSON.stringify(context.submission),
                _method: 'put'
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
            submission: JSON.stringify(context.submission)
		})
		.then((response) => {

			window.location = '/home'
		})
		.catch((error) => {

		})
	}


	return (
		<div className="my-4">
            <div className="progress mb-4" style={{height: '7px'}}>
              <div className="progress-bar" id="jb-question-pbar" role="progressbar" style={{width: "100%"}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
            </div>

			<div className="w-50" style={{margin: '0 auto'}}>
				<h2>Miscelleneous</h2>
                 <form onSubmit={formik.handleSubmit}>
    				<div className="bj-border bj-radius-10 bj-p-20 bg-one">
    					<div className="card-body">
                            <div>
                                <strong><label htmlFor="first-name" className="col-form-label"><b>Choose Country</b></label></strong>
                                <select 
                                    name="country"
                                    className="bj-input bg-one"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.country}
                                >
                                  {
                                    countries?.map((c) => (
                                        <option key={c.name}>
                                            {c.name}
                                        </option>
                                    ))
                                  }
                                </select>
                            </div>


    						<div className="">

                                <strong>Planning to relocate</strong>
                                <div className="d-flex">
                                    <div>
                                        <strong><label className="form-check-label" htmlFor="flexRadioDefault1">No</label></strong>
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
                                        <strong><label className="form-check-label" htmlFor="flexRadioDefault1">Yes</label></strong>
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

                                <strong><label htmlFor="first-name" className="col-form-label"><b>Salary Expectation</b></label></strong>
                                <div className="">
                                    <input
                                        type="number"
                                        name="salaryExpectation"
                                        value={formik.values.salaryExpectation}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        required
                                        className="bj-input bg-one"
                                    />
                                </div>

                                {formik.touched.salaryExpectation && formik.errors.salaryExpectation ? (
                                  <div className="text-danger">{formik.errors.salaryExpectation}</div>
                                ) : null}
                            </div>

                            <div className="">

                                <strong><label htmlFor="first-name" className="col-form-label"><b>Notice Period: (days)</b></label></strong>
                                <div className="">
                                    <input
                                        type="number"
                                        name="noticePeriod"
                                        value={formik.values.noticePeriod}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        required
                                        className="bj-input bg-one"
                                    />
                                </div>

                                {formik.touched.noticePeriod && formik.errors.noticePeriod ? (
                                  <div className="text-danger">{formik.errors.noticePeriod}</div>
                                ) : null}
                            </div>

                            <div className="">
                            	<p>Tell us few dates where you are free</p>
                                <strong><label htmlFor="first-name" className="col-form-label"><b>Interview Date </b></label></strong>
                                <div className="">
                                    <input
                                        type="date"
                                        name="scheduleInterview"
                                        value={formik.values.scheduleInterview}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        required
                                        className="bj-input bg-one"
                                    />
                                </div>
                            </div>
    					</div>
    				</div>

                    <div className="mt-2 mb-4 text-end">
                        <button type="button" className="btn bj-btn-prime text-prime" type="submit">Continue</button>
                    </div>
                </form>

		    </div>
        </div>
	)
}

export default JobQuestions;
