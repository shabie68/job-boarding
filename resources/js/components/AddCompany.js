import {useState, useEffect} from 'react'
import Quill from 'quill';

import Toolbar from "quill/modules/toolbar";
import Snow from "quill/themes/snow";

import Bold from "quill/formats/bold";
import Italic from "quill/formats/italic";
import Header from "quill/formats/header";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";


function AddCompany() {

	useEffect(() => {
		setDescription(new Quill('#company-description', editorOptions))
				
	}, [])

	const [title, setTitle] = useState();
	const [description, setDescription] = useState();
	const [logo, setLogo] = useState();
	const [locations, setLocations] = useState('');
	const [email, setEmail] = useState();
	const [totalEmployees, setTotalEmployees] = useState();
	const [websiteUrl, setWebsiteUrl] = useState();
	const [phoneNumber, setPhoneNumber] = useState();
	const [Industry, setIndustry] = useState();


	const [editorOptions, setEditorOptions] = useState({
	  debug: 'info',
	  modules: {
	    toolbar: true,
	  },
	  placeholder: 'Compose an epic...',
	  theme: 'snow',
	  container: '#description'
	})


	return (
		<div className="d-flex gap-3 bg-white">
			<div className="w-50">
				<div className="form-group mb-3">
				    <label htmlFor="title">Title</label>
				    <input 
				    	type="text"
				    	className="form-control" 
				    	id="title" 
				    	aria-describedby="titleHelp"
				    	placeholder="Enter title"
				    	value={title}
				    	onChange={(e) => setTitle(e.target.value)}
				    />
			    	<small id="titleHelp" className="form-text text-muted">Enter the title for the company</small>
			  	</div>


			  	<div className="mb-3">	
					<label>Description</label>
					<div id="company-description">
						NEW Description
					</div>
				</div>

			  	<div className="form-group mb-3">
				    <label htmlFor="desc">Locations</label>
				    <input 
				    	type="text" 
				    	className="form-control" 
				    	id="locations" 
				    	aria-describedby="locationHelp" 
				    	placeholder="Enter descritions"
				    	value={locations}
				    	onChange={(e) => setLocations(e.target.value)}
				   	/>
			    	<small id="locationHelp" className="form-text text-muted">Enter locations of the company. Can be multiple</small>
			  	</div>

			  	<div className="form-group mb-3">
				    <input type="text" className="form-control" readOnly value={locations} />
				    <small id="allLocations" className="form-text text-muted">Selected Locations</small>
			  	</div>

			  	<div className="form-group mb-3">
				    <label htmlFor="title">Total Employees</label>
				    <input 
				    	type="number" 
				    	className="form-control" 
				    	id="employees" 
				    	aria-describedby="employeesHelp" 
				    	placeholder="Total Employees" 
				    	value={totalEmployees}
				    	onChange={(e) => setTotalEmployees(e.target.value)}
				    />
			    	<small id="employeesHelp" className="form-text text-muted">Total employees in the company</small>
			  	</div>
			</div>

			<div style={{borderRight: '1px solid #e5eaef'}}>

			</div>

			<div className="w-50">
				<div className="form-group mb-3">
				    <label htmlFor="website-url">Website Url</label>
				    <input 
				    	type="text" 
				    	className="form-control" 
				    	id="website-url" 
				    	aria-describedby="website-url" 
				    	placeholder="Enter website url" 
				    	value={websiteUrl}
				    	onChange={(e) => setWebsiteUrl(e.target.value)}
				    />
			    	<small id="website-url" className="form-text text-muted">Website Url if any</small>
			  	</div>

			  	<div className="form-group mb-3">
				    <label htmlFor="companyEmail">Email</label>
				    <input 
				    	type="email" 
				    	className="form-control" 
				    	id="companyEmail" 
				    	aria-describedby="companyEmailHelp" 
				    	placeholder="Locations" 
				    	value={email}
				    	onChange={(e) => setEmail(e.target.value)}
				    />
			    	<small id="companyEmailHelp" className="form-text text-muted">Email of the company. (Separated by commas)</small>
			  	</div>
			  	
				<div style={{margin: '20px 0'}}>
					<label>Choose Industry</label>
					<select 
						className="form-control" 
						name="type"
						onChange={(e) => setIndustry(e.target.value)}
					>
						<option value="electronics">Electronics</option>
						<option value="ecommerce">Ecommererce</option>
						<option value="education">Educations</option>
						<option value="marketing">Marketing</option>
						<option value="food-store">Food Store</option>
					</select>
				</div>

			</div>
		</div>
	)
}

export default AddCompany;