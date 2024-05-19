import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import Quill from 'quill';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';

const validate = values => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Required';
  } else if (values.title.length > 15) {
    errors.title = 'Must be 15 characters or less';
  }

  if (!values.location) {
    errors.location = 'Required';
  } else if (values.location.length > 20) {
    errors.location = 'Must be 20 characters or less';
  }

  if (!values.salary) {
     errors.salary = 'Salary field is required';
  } else if (!/^\d+$/.test(values.salary)) { // Ensure totalEmployees is a number
     errors.salary = 'Must be a number';
  }

  return errors;
};

function AddJob() {
  const navigate = useNavigate();

  const [descriptionQuill, setDescriptionQuill] = useState();
  const [responsibilityQuill, setResponsibilityQuill] = useState();
  const [requirementQuill, setRequirementQuill] = useState();
  const [additionalDetails, setAdditionalDetails] = useState('description');

  useEffect(() => {
    setDescriptionQuill(new Quill('#description', {
      modules: { toolbar: true },
      theme: 'snow',
      placeholder: 'Job description...',
    }));
    setResponsibilityQuill(new Quill('#responsibilities', {
      modules: { toolbar: true },
      theme: 'snow',
      placeholder: 'Job responsibilities...',
    }));
    setRequirementQuill(new Quill('#requirements', {
      modules: { toolbar: true },
      theme: 'snow',
      placeholder: 'Job requirements...',
    }));
  }, []);

  const formik = useFormik({
    initialValues: {
      title: '',
      location: '',
      type: 'remote',
      salary: 40000,
    },
    validate,
    onSubmit: values => {
      const data = {
        title: values.title,
        description: descriptionQuill.root.innerHTML,
        location: values.location,
        type: values.type,
        responsibilities: responsibilityQuill.root.innerHTML,
        requirements: requirementQuill.root.innerHTML,
        salary: values.salary,
      };

      fetch("http://127.0.0.1:8000/api/add-job", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(() => navigate('/home'))
        .catch(error => console.error('Error:', error));
    },
  });

  return (
    <div className="mt-4">
      <div className="d-flex gap-4 align-items-center">
        <Link to="/home">
          <svg style={{ color: 'black' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
          </svg>
        </Link>
        <strong>Go back</strong>
      </div>

      <section style={{ margin: '0 auto', width: '50%' }}>
        <h2>Add Job</h2>
        <div className="card">
          <div className="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div>
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                />
                {formik.touched.title && formik.errors.title ? (
                  <div className="text-danger">{formik.errors.title}</div>
                ) : null}
              </div>

              <div style={{ margin: '20px 0' }}>
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.location}
                />
                {formik.touched.location && formik.errors.location ? (
                  <div className="text-danger">{formik.errors.location}</div>
                ) : null}
              </div>

              <div style={{ margin: '20px 0' }}>
                <label>Salary</label>
                <input
                  type="number"
                  name="salary"
                  className="form-control"
                  onChange={formik.handleChange}
                  value={formik.values.salary}
                />

                {formik.touched.salary && formik.errors.salary ? (
                  <div className="text-danger">{formik.errors.salary}</div>
                ) : null}
              </div>

              <div style={{ margin: '20px 0' }}>
                <label>Type</label>
                <select
                  className="form-control"
                  name="type"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.type}
                >
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="onsite">Onsite</option>
                </select>
              </div>

              <div style={{ margin: '20px 0' }}>
                <label>Additional details</label>
                <select className="form-control" onChange={e => setAdditionalDetails(e.target.value)}>
                  <option value="description">Description</option>
                  <option value="responsibilities">Responsibilities</option>
                  <option value="requirements">Requirements</option>
                </select>
              </div>

              <div>
                <div style={{ display: additionalDetails === 'description' ? 'block' : 'none' }}>
                  <label>Description</label>
                  <div id="description">Description</div>
                </div>

                <div style={{ display: additionalDetails === 'responsibilities' ? 'block' : 'none' }}>
                  <label>Responsibilities</label>
                  <div id="responsibilities">Responsibilities</div>
                </div>

                <div style={{ display: additionalDetails === 'requirements' ? 'block' : 'none' }}>
                  <label>Requirements</label>
                  <div id="requirements">Requirements</div>
                </div>
              </div>

              <div className="mt-4">
                <button className="btn btn-primary text-align-end" type="submit">Add Job</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AddJob;
