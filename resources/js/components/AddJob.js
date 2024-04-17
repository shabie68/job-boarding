import {useState, useEffect} from 'react'
import { BrowserRouter, Routes, Link, Route, useNavigate } from "react-router-dom";

import Quill from 'quill';

import Toolbar from "quill/modules/toolbar";
import Snow from "quill/themes/snow";

import Bold from "quill/formats/bold";
import Italic from "quill/formats/italic";
import Header from "quill/formats/header";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";


function AddJob() {

	useEffect(() => {
		setDescriptionQuill(new Quill('#description', editorOptions))
		setResponsibilityQuill(new Quill('#responsibilities', editorOptions ))
		setRequirementQuill(new Quill('#requirements', editorOptions ))
				
	}, [])
  

	const [title, setTitle] = useState('Job Title');
	const [location, setLocation] = useState('Islamabad');
	const [type, setType] = useState('remote');
	const [additionalDetails, setAdditionalDetails] = useState('description')

	const [salary, setSalary] = useState(40000);
	const [editorOptions, setEditorOptions] = useState({
	  debug: 'info',
	  modules: {
	    toolbar: true,
	  },
	  placeholder: 'Compose an epic...',
	  theme: 'snow',
	  container: '#description'
	})

	const [option, setOptions] = useState({
	  debug: 'info',
	  modules: {
	    toolbar: true,
	  },
	  placeholder: 'Compose an epic...',
	  theme: 'snow',
	  container: '#responsibilities'
	})

	
	const navigate = useNavigate()
	const [descriptionQuill, setDescriptionQuill] = useState();
	const [responsibilityQuill, setResponsibilityQuill] = useState();
	const [requirementQuill, setRequirementQuill] = useState();

	
	const handleAddtionalDetail = (event) => {
		setAdditionalDetails(event.target.value)
	}

	async function addJob() {

		const data = {
			title: title,
			description: descriptionQuill.getSemanticHTML(),
			location: location,
			type: type,
			responsibilities: responsibilityQuill.getSemanticHTML(),
			requirements: requirementQuill.getSemanticHTML(),
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
	    .then(navigate('/home'))
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
						<label >Location</label>
						<input type="text" name="location" className="form-control" onChange={(e) => {setLocation(e.target.value)}}/>
					</div>

					<div style={{margin: '20px 0'}}>
						<label >Salary</label>
						<input type="number" name="salary" className="form-control" onChange={(e) => {setSalary(e.target.value)}}/>
					</div>

					<div style={{margin: '20px 0'}}>
						<label >Type</label>
						<select className="form-control" name="type" onChange={(e) => {setType(e.target.value)}}>
							<option value="remote">Remote</option>
							<option value="hybrid">Hyrid</option>
							<option value="onsite">Onsite</option>
						</select>
					</div>

					<div style={{margin: '20px 0'}}>
						<label >Additional details</label>
						<select className="form-control" name="type" onChange={handleAddtionalDetail}>
							<option value="description">Description</option>
							<option value="responsibilities">Responsibilities</option>
							<option value="requirements">Requirements</option>
						</select>
					</div>

					<div>

						<div style={{display: additionalDetails == 'description' ? 'block' : 'none'}}>	
							<label>Description</label>
							<div id="description">
								NEW Description
							</div>
						</div>

						<div style={{display: additionalDetails == 'responsibilities' ? 'block' : 'none'}}>
							<label>Responsibilities</label>
							<div id="responsibilities">
								NEW Responsibilities
							</div>
						</div>

						<div style={{display: additionalDetails == 'requirements' ? 'block' : 'none'}}>
							<label>Requirements</label>
							<div id="requirements">
								NEW Requirements
							</div>
						</div>
					</div>

					<div className="mt-4">
						<button className="btn btn-primary text-align-end" onClick={addJob}>Add Job</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AddJob;

