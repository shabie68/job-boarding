import {useState, useEffect} from 'react'
import apiClient from '../services/apiClient';
import {Link, useNavigate} from 'react-router-dom'
import { useFormik } from 'formik';
import Quill from 'quill';
import Toolbar from "quill/modules/toolbar";
import Snow from "quill/themes/snow";
import Bold from "quill/formats/bold";
import Italic from "quill/formats/italic";
import Header from "quill/formats/header";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

const validate = values => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Title field is required';
  }

  if (!values.locations) {
    errors.locations = 'Locations field is Required';
  }

 if (!values.email) {
     errors.email = 'Email field is Required';
   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
     errors.email = 'Invalid email address';
   }

   if (!values.totalEmployees) {
	   errors.totalEmployees = 'Total Employees field is Required';
	} else if (!/^\d+$/.test(values.totalEmployees)) { // Ensure totalEmployees is a number
	   errors.totalEmployees = 'Must be a number';
	}


    if (!values.websiteUrl) {
    errors.websiteUrl = 'Website Url field is Required';
  } else if (values.websiteUrl.length > 100) { // Assuming a reasonable max length for URLs
    errors.websiteUrl = 'Must be 100 characters or less';
  } else if (!/^https?:\/\/[^\s$.?#].[^\s]*$/i.test(values.websiteUrl)) { // Ensure URL format is correct
    errors.websiteUrl = 'Invalid website URL';
  }

  if (!values.phoneNumber) {
    errors.phoneNumber = 'Phone Number field is Required';
  } else if (!/^\+?[1-9]\d{1,14}$/.test(values.phoneNumber)) { // Ensure phoneNumber matches E.164 format
    errors.phoneNumber = 'Invalid phone number';
  }

  if (!values.logo) {
    errors.file = 'Logo field is Required';
  }

  // if (!values.industry) {
  //   errors.industry = 'Required';
  // } else if (values.industry.length > 20) {
  //   errors.industry = 'Invalid industry address';
  // }

  return errors;
};



function AddCompany() {

	const navigate = useNavigate();
	const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      logo: '',
      locations: '',
      email: '',
      totalEmployees: '',
      websiteUrl: '',
      phoneNumber: '',
      industry: 'ecommerce'

    },
    validate,
    onSubmit: values => {
    	alert("SUBMITTING")
      setLoading(true)
		let contactInformation = {
			phone_number: formik.phoneNumber,
			email: formik.email
		}


		const formData = new FormData();

		formData.append('title', formik.values.title)
	    formData.append('logo', formik.values.logo);
	    formData.append('description', description.root.innerHTML)
	    formData.append('website_url', formik.values.websiteUrl)
	    formData.append('industry', formik.values.industry)
	    formData.append('total_employees', formik.values.totalEmployees)
	    formData.append('locations', formik.values.locations)
	    formData.append('contact_information', JSON.stringify(contactInformation))
	    formData.append('_method', 'put')
		apiClient.post('http://127.0.0.1:8000/api/company/store', formData)
		.then((response) => {
			// window.location = '/companies'
			navigate('/companies', {
				state: {
					addCompany: true
				}
			})

		})
		.catch(() => {

		})
    },
  });

	const handleFileChange = (event) => {
    formik.setFieldValue('logo', event.currentTarget.files[0]);
  };




	useEffect(() => {
		setDescription(new Quill('#company-description', editorOptions))		
	}, [])

	const [loading, setLoading] = useState(false)

	const [title, setTitle] = useState();
	const [description, setDescription] = useState();
	const [logo, setLogo] = useState();
	const [locations, setLocations] = useState('');
	const [email, setEmail] = useState();
	const [totalEmployees, setTotalEmployees] = useState();
	const [websiteUrl, setWebsiteUrl] = useState();
	const [phoneNumber, setPhoneNumber] = useState();
	const [industry, setIndustry] = useState('ecommerce');

	const [editorOptions, setEditorOptions] = useState({
	  debug: 'info',
	  modules: {
	    toolbar: true,
	  },
	  placeholder: 'Company details...',
	  theme: 'snow',
	  container: '#company-description'
	})

	function saveCompany() {

		setLoading(true)
		let contactInformation = {
			phone_number: phoneNumber,
			email: email
		}


		const formData = new FormData();

		formData.append('title', title)
	    formData.append('logo', logo);
	    formData.append('description', description.getSemanticHTML())
	    formData.append('website_url', websiteUrl)
	    formData.append('industry', industry)
	    formData.append('total_employees', totalEmployees)
	    formData.append('locations', locations)
	    formData.append('contact_information', JSON.stringify(contactInformation))
	    formData.append('_method', 'put')

		apiClient.post('http://127.0.0.1:8000/api/company/store', formData)
		.then((response) => {
			// window.location = '/companies'
			navigate('/companies', {
				state: {greeting: 'hello'}
			})

		})
		.catch(() => {

		})

	}


	return (

		<>
			<div className="d-flex gap-4 mb-3 align-items-center">
				<Link to="/companies">
					<svg style={{color: 'black'}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
					  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
					</svg>
				</Link>
				<strong>Go back</strong>
			</div>

			<h2>Add Company</h2>
			<div className="bg-white mb-3">
				<form onSubmit={formik.handleSubmit}>
					<div className="d-flex gap-3">

						<div className="w-50">

							<div className="form-group mb-3">
							    <label htmlFor="title">Title</label>
							    <input 
							    	type="text"
							    	className="form-control" 
							    	id="title" 
							    	aria-describedby="titleHelp"
							    	placeholder="Enter title"
							    	value={formik.values.title}
							    	onChange={formik.handleChange}
							    	onBlur={formik.handleBlur}

							    />
						    	<small id="titleHelp" className="form-text text-muted">Enter the title for the company</small>
						    	{formik.touched.title && formik.errors.title ? (
				                  <div className="text-danger">{formik.errors.title}</div>
				                ) : null}
						  	</div>

						  	<div className="mb-3">
							  <label htmlFor="formFileSm" className="form-label">Small file input example</label>
							  <input 
							  	className="form-control form-control-sm" 
							  	id="formFileSm" 
							  	type="file" 
							  	onChange={handleFileChange}
						    />

						    {formik.touched.logo && formik.errors.logo ? (
					          <div className="text-danger">{formik.errors.logo}</div>
					        ) : null}
							</div>

							<div className="form-group mb-3">
							    <label htmlFor="desc">Locations</label>
							    <input 
							    	type="text" 
							    	className="form-control" 
							    	id="locations" 
							    	aria-describedby="locationHelp" 
							    	placeholder="Enter locations"
							    	value={formik.values.locations}
							    	onChange={formik.handleChange}
							    	onBlur={formik.handleBlur}


							   	/>
						    	<small id="locationHelp" className="form-text text-muted">Enter locations of the company. Can be multiple</small>
						  		{formik.touched.locations && formik.errors.locations ? (
				                  <div className="text-danger">{formik.errors.locations}</div>
				                ) : null}
						  	</div>

						  	<div className="form-group mb-3">
						  		<ul>
						  		{
						  			locations ? locations.split(',').map((location) => (
						  				<li key={location}>{location}</li>
						  			))
						  			:''
						  		}

						  		</ul>
						  		<span className="p-4">

						  		</span>
						  	</div>

						  	<div className="mb-3">	
								<label>Description</label>
								<div id="company-description">
								</div>
							</div>
						</div>

						<div style={{borderRight: '1px solid #e5eaef'}}>

						</div>

						<div className="w-50">

							<div style={{margin: '20px 0'}}>
						  		<label htmlFor="websiteUrl">Website url</label>
							    <input
							        id="websiteUrl"
							        name="websiteUrl"
							        type="text"
							        className="form-control" 
							        onChange={formik.handleChange}
							        onBlur={formik.handleBlur}
							        value={formik.values.websiteUrl}
							      />
						      	{formik.touched.websiteUrl && formik.errors.websiteUrl ? (
						        	<div className="text-danger">{formik.errors.websiteUrl}</div>
							    ) : null}
						  	</div>


						  	<div style={{margin: '20px 0'}}>
						  		<label htmlFor="email">Email Address</label>
							    <input
							        id="email"
							        name="email"
							        type="email"
							        className="form-control" 
							        onChange={formik.handleChange}
							        onBlur={formik.handleBlur}
							        value={formik.values.email}
							      />
						      	{formik.touched.email && formik.errors.email ? (
						        	<div className="text-danger">{formik.errors.email}</div>
							    ) : null}
						  	</div>

						  	<div style={{margin: '20px 0'}}>
						  		<label htmlFor="totalEmployees">Total Employees</label>
							    <input
							        id="totalEmployees"
							        name="totalEmployees"
							        type="number"
							        className="form-control" 
							        onChange={formik.handleChange}
							        onBlur={formik.handleBlur}
							        value={formik.values.totalEmployees}
							      />
						      	{formik.touched.totalEmployees && formik.errors.totalEmployees ? (
						        	<div className="text-danger">{formik.errors.totalEmployees}</div>
							    ) : null}
						  	</div>

						  	<div style={{margin: '20px 0'}}>
						  		<label htmlFor="phoneNumber">Phone Number</label>
							    <input
							        id="phoneNumber"
							        name="phoneNumber"
							        type="tel"
							        className="form-control" 
							        onChange={formik.handleChange}
							        onBlur={formik.handleBlur}
							        value={formik.values.phoneNumber}
							      />
						      	{formik.touched.phoneNumber && formik.errors.phoneNumber ? (
						        	<div className="text-danger">{formik.errors.phoneNumber}</div>
							    ) : null}
						  	</div>
						  	
							<div style={{margin: '20px 0'}}>
								<label>Choose Industry</label>
								<select 
									className="form-control" 
									name="industry"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								>
									<option value="electronics">Electronics</option>
									<option value="ecommerce">Ecommererce</option>
									<option value="education">Educations</option>
									<option value="marketing">Marketing</option>
									<option value="real-state">Real State</option>
									<option value="entertainment">Enterainment</option>
									<option value="logistics">Transportattion and Logistics</option>
									<option value="energy">Energy</option>
									<option value="finance">Finance</option>
									<option value="health-care">Health Care</option>
									<option value="technology">Technology</option>
									<option value="food-store">Food Store</option>
								</select>
							</div>
						</div>
					</div>
					
					<div className="row mb-0 text-end">
			            <div className="col-md-8 offset-md-4 ">
			                <button type="button" className="btn btn-primary" type="submit">
			                	{
	                                !loading ?
	                                <div>
	                                    Save
	                                </div>
	                                :
	                                <div>
	                                    <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
	                                    Loading...
	                                </div>
	                            }
			                </button>
			            </div>
			        </div>
			    </form>
	        </div>
	    </>
	)
}

export default AddCompany;