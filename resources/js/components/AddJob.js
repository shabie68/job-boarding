import {useState, useEffect} from 'react'
import { BrowserRouter, Routes, Link, Route } from "react-router-dom";

import Quill from 'quill';
// import Quill from "quill/core";

import Toolbar from "quill/modules/toolbar";
import Snow from "quill/themes/snow";

import Bold from "quill/formats/bold";
import Italic from "quill/formats/italic";
import Header from "quill/formats/header";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

// Or if you only need the core build
// import Quill from 'quill/core';






function AddJob() {

	useEffect(() => {
// 		Quill.register({
// 	  // "modules/toolbar": Toolbar,
// 	  "themes/snow": Snow,
// 	  // "formats/bold": Bold,
// 	  // "formats/italic": Italic,
// 	  // "formats/header": Header,
// });

		const options = {
		  debug: 'info',
		  modules: {
		    toolbar: true,
		  },
		  placeholder: 'Compose an epic...',
		  theme: 'snow'
		};

		setDescriptionQuill(new Quill('#description', options));
		// setRequirementQuill(new Quill('#responsibility', options));
		// setRequirementQuill(new Quill('#requirement', options));
		
	}, [])
  

	const [title, setTitle] = useState('Job Title');
	const [description, setDescription] = useState('Dummy description');
	const [location, setLocation] = useState('Islamabad');
	const [jobType, setJobType] = useState('remote');
	const [additionalDetails, setAdditionalDetails] = useState('descriptions')

	const [jobResponsibilites, setJobResponsibilities] = useState('Dummy Responsibilities');
	const [jobRequirements, setJobRequirements] = useState('Dummy Job Requirements');
	const [salary, setSalary] = useState(40000);
	const [descriptionQuill, setDescriptionQuill] = useState();
	const [responsibilityQuill, setResponsibilityQuill] = useState();
	const [requirementQuill, setRequirementQuill] = useState();
	

	async function addJob() {

		const data = {
			title: title,
			description: description,
			location: location,
			job_type: jobType,
			job_responsibilities: jobResponsibilites,
			job_requirements: quill.getSemanticHTML(),
			salary: salary
		}
		

		fetch("http://127.0.0.1:8000/api/add-job", {
		    method: 'POST',
		    headers: {
		        'Content-Type': 'application/json',
		        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
		    },
		    body: JSON.stringify(data),
		})
	    .then(response => response.json())
	    .then(data => console.log(data))
	    .catch(error => console.error('Error:', error));

	}


	return (
		<div className="mt-4">
			<div className="d-flex gap-4">
				<Link to="/home">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
					  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
					</svg>
				</Link>
				<strong>Go back</strong>
			</div>

			<div className="card" style={{margin: '0 auto', width: '50%'}}>
				<div className="card-body">
					<div>
						<label>Title</label>
						<input type="text" name="title" className="form-control" onChange={(e) => {setTitle(e.target.value)}}/>
					</div>

					<div style={{margin: '20px 0'}}>
						<label >Description</label>
						<textarea type="text" name="description" className="form-control" 
							onChange={(e) => {setDescription(e.target.value)}}
						/>
					</div>

					<div style={{margin: '20px 0'}}>
						<label >Location</label>
						<input type="text" name="location" className="form-control" onChange={(e) => {setLocation(e.target.value)}}/>
					</div>

					<div style={{margin: '20px 0'}}>
						<label >Salary</label>
						<input type="number" name="salary" className="form-control" onChange={(e) => {setSalary(e.target.value)}}/>
					</div>

					<div style={{margin: '20px 0'}}>
						<label >Job Type</label>
						<select className="form-control" name="job_type" onChange={(e) => {setJobType(e.target.value)}}>
							<option value="remote">Remote</option>
							<option value="hybrid">Hyrid</option>
							<option value="onsite">Onsite</option>
						</select>
					</div>


					<div style={{margin: '20px 0'}}>
						<label >Job Responsibilities</label>
						<textarea type="text" name="job_responsibilities" className="form-control" onChange={(e) => {setJobResponsibilities(e.target.value)}}/>
					</div>

					<div style={{margin: '20px 0'}}>
						<label >Additional details</label>
						<select className="form-control" name="job_type" onChange={(e) => {setAdditionalDetails(e.target.value)}}>
							<option value="descriptions">Descriptions</option>
							<option value="responsibilities">Responsibilities</option>
							<option value="requirements">Requirements</option>
						</select>
					</div>

					<div>
						{
							additionalDetails == 'descriptions' ?
							<>
								<label>Job Description</label>
								<div id="description">
								</div>
							</>
							: additionalDetails == 'responsibilities' ?

							<>
								<label>Job Responsibilities</label>
								<div id="responsibility">
								</div>
							</>

							:
							<>
								<label>Job Requirements</label>
								<div id="requirement">
								</div>
							</>
							
						}
					</div>

					<div className="text-align-end">
						<button className="btn btn-primary text-align-end" onClick={addJob}>Add Job</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AddJob;

