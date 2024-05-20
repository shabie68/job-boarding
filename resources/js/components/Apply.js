import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import apiClient from '../services/apiClient';
import BoardJobContext from '../contexts/BoardJobContext.js';

const validate = values => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = 'First Name field is required';
  }

  if (!values.lastName) {
    errors.lastName = 'Last Name field is required';
  }

  if (!values.phoneNumber) {
    errors.phoneNumber = 'Phone Number field is required';
  } else if (!/^\+?[1-9]\d{1,14}$/.test(values.phoneNumber)) { // Ensure phoneNumber matches E.164 format
    errors.phoneNumber = 'Invalid phone number';
  }

  if (!values.email) {
    errors.email = 'Email field is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

function Apply(props) {
  const location = useLocation();
  const context = useContext(BoardJobContext);
  const navigate = useNavigate();
  const [submission, setSubmission] = useState({});

  useEffect(() => {
    saveDefaultData();
  }, []);

  const saveDefaultData = () => {
    apiClient.post('http://127.0.0.1:8000/api/add-job-data/', {
      jobId: location.state.job.id,
      company_id: location.state.job.company_id
    })
    .then((response) => {
      setSubmission(response.data.submission);
      formik.setValues({
        firstName: response.data.submission.first_name,
        lastName: response.data.submission.last_name,
        phoneNumber: response.data.submission.phone_number,
        email: response.data.submission.email,
      });
    });
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
    },
    validate,
    onSubmit: values => {
      const data = {
        submission: JSON.stringify(submission),
        first_name: values.firstName,
        last_name: values.lastName,
        phone_number: values.phoneNumber,
        email: values.email
      };

      apiClient.put('http://127.0.0.1:8000/api/apply/candidate/' + location.state.job.user_id + '/job/' + submission.board_job_id, data)
        .then((response) => {
          props.updateJobContext({
            user_id: location.state.job.user_id,
            board_job_id: submission.board_job_id,
            submission: response.data.submission
          });
          navigate('/resume');
        })
        .catch((error) => {
          // Handle error
        });
    },
  });

  return (
    <div>
      <div className="progress mb-4" style={{height: '7px'}}>
        <div className="progress-bar" id="jb-apply-pbar" role="progressbar" style={{width: "33%"}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
      <div className="w-lg-50" style={{margin: '0 auto'}}>
        <h2>Personal Information</h2>
        <div className="card">
          <div className="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="">
                <label htmlFor="firstName" className="col-form-label"><b>First Name</b></label>
                <div className="">
                  <input
                    type="text"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    className="form-control"
                  />
                </div>
                {formik.touched.firstName && formik.errors.firstName ? (
                  <div className="text-danger">{formik.errors.firstName}</div>
                ) : null}
              </div>
              <div className="">
                <label htmlFor="lastName" className="col-form-label"><b>Last Name</b></label>
                <div className="">
                  <input
                    type="text"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    className="form-control"
                  />
                </div>
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div className="text-danger">{formik.errors.lastName}</div>
                ) : null}
              </div>
              <div className="">
                <label htmlFor="phoneNumber" className="col-form-label"><b>Phone</b></label>
                <div className="">
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    className="form-control"
                  />
                </div>
                {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                  <div className="text-danger">{formik.errors.phoneNumber}</div>
                ) : null}
              </div>
              <div className="">
                <label htmlFor="email" className="col-form-label"><b>Email</b></label>
                <div className="">
                  <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    className="form-control"
                  />
                </div>
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-danger">{formik.errors.email}</div>
                ) : null}
              </div>
              <div className="mt-2 text-align-end">
                <button type="submit" className="btn btn-primary">Continue</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Apply;
