import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import Quill from 'quill';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';

const validate = values => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Title field is required';
  } else if (values.title.length > 15) {
    errors.title = 'Must be 15 characters or less';
  }

  if (!values.location) {
    errors.location = 'Location field is required';
  } else if (values.location.length > 20) {
    errors.location = 'Must be 20 characters or less';
  }

  if (!values.salary) {
     errors.salary = 'Salary field is required';
  } else if (!/^\d+$/.test(values.salary)) { // Ensure totalEmployees is a number
     errors.salary = 'Must be a number';
  }

  if (!values.description) {
    errors.description = 'Description field is required.';
  }
  if(values.description=='<p><br></p>') {
    errors.description = 'Description should not be empty'
  } 

  if (!values.responsibilities) {
    errors.responsibilities = 'Responsibility field is required';
  } 

  if(values.responsibilities=='<p><br></p>') {
    errors.responsibilities = 'Responsibility should not be empty'
  }

  if (!values.requirements) {
    errors.requirements = 'Requirements field is required';
  }

  if(values.requirements=='<p><br></p>') {
    errors.requirements = 'Requirements should not be empty'
  } 




  return errors;
};

function AddJob() {
  const navigate = useNavigate();

  useEffect(() => {
    const descriptionQuill = new Quill("#description", {
      theme: 'snow',
    });

    const requirementQuill = new Quill("#requirements", {
      theme: 'snow',
    });

    const responsibilityQuill = new Quill("#responsibilities", {
      theme: 'snow',
    });

    descriptionQuill.on('text-change', () => {
      const value = descriptionQuill.root.innerHTML;
      formik.setFieldValue('description', value);
    });

    requirementQuill.on('text-change', () => {
      const value = requirementQuill.root.innerHTML;
      formik.setFieldValue('requirements', value);
    });

    responsibilityQuill.on('text-change', () => {
      const value = responsibilityQuill.root.innerHTML;
      formik.setFieldValue('responsibilities', value);
    });

  }, []);

  const formik = useFormik({
    initialValues: {
      title: '',
      location: '',
      type: 'remote',
      salary: 40000,
      additionalDetails: 'description',
      description: '',
      requirements: '',
      responsibilities: ''
    },
    validate,
    onSubmit: values => {
      const data = {
        title: values.title,
        description: values.description,
        location: values.location,
        type: values.type,
        responsibilities: values.responsibilities,
        requirements: values.requirements,
        salary: values.salary
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
                  onBlur={formik.handleBlur}
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
                <select
                  name="additionalDetails"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.additionalDetails}
                >
                  <option value="description">Description</option>
                  <option value="responsibilities">Responsibilities</option>
                  <option value="requirements">Requirements</option>
                </select>
                <small className="text-info">Change the option to responsibilities or requirements to set them up</small>

                
              </div>

              <div>
                <div style={{ display: formik.values.additionalDetails === 'description' ? 'block' : 'none' }}>
                  <label>Description</label>
                  <div id="description">Description</div>
                </div>

                <div style={{ display: formik.values.additionalDetails === 'responsibilities' ? 'block' : 'none' }}>
                  <label>Responsibilities</label>
                  <div id="responsibilities">Responsibilities</div>
                </div>

                <div style={{ display: formik.values.additionalDetails === 'requirements' ? 'block' : 'none' }}>
                  <label>Requirements</label>
                  <div id="requirements">Requirements</div>
                </div>

                {formik.touched.description && formik.errors.description ? (
                  <div className="text-danger">{formik.errors.description}</div>
                ) : null}

                {formik.touched.requirements && formik.errors.requirements ? (
                  <div className="text-danger">{formik.errors.requirements}</div>
                ) : null}

                {formik.touched.responsibilities && formik.errors.responsibilities ? (
                  <div className="text-danger">{formik.errors.responsibilities}</div>
                ) : null}
              </div>

              <div className="mt-4 text-end">
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
