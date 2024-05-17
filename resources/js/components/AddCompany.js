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
    errors.firstName = 'Required';
  } else if (values.title.length > 15) {
    errors.title = 'Must be 15 characters or less';
  }

  if (!values.locations) {
    errors.locations = 'Required';
  } else if (values.locations.length > 20) {
    errors.locations = 'Must be 20 characters or less';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.totalEmployees) {
    errors.totalEmployees = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.totalEmployees)) {
    errors.totalEmployees = 'Invalid email address';
  }

  if (!values.websiteUrl) {
    errors.websiteUrl = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.websiteUrl)) {
    errors.websiteUrl = 'Invalid email address';
  }

  if (!values.phoneNumber) {
    errors.phoneNumber = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.phoneNumber)) {
    errors.phoneNumber = 'Invalid email address';
  }

  if (!values.industry) {
    errors.industry = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.industry)) {
    errors.industry = 'Invalid email address';
  }

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
      industry: ''

    },
    validate,
    onSubmit: values => {
      alert("HI")
    },
  });




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
			navigate('/companies')

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
							    	onChange={formik.values.title}
							    	onBlur={formik.handleBlur}

							    />
						    	<small id="titleHelp" className="form-text text-muted">Enter the title for the company</small>
						  	</div>

						  	<div className="mb-3">
							  <label htmlFor="formFileSm" className="form-label">Small file input example</label>
							  <input 
							  	className="form-control form-control-sm" 
							  	id="formFileSm" 
							  	type="file" 
							  	onChange={(e) => {setLogo(e.target.files[0])}}

						    />
							</div>

							<div className="form-group mb-3">
							    <label htmlFor="desc">Locations</label>
							    <input 
							    	type="text" 
							    	className="form-control" 
							    	id="locations" 
							    	aria-describedby="locationHelp" 
							    	placeholder="Enter locations"
							    	value={locations}
							    	onChange={formik.values.locations}
							   	/>
						    	<small id="locationHelp" className="form-text text-muted">Enter locations of the company. Can be multiple</small>
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
							    	onChange={formik.values.websiteUrl}
							    />
						    	<small id="website-url" className="form-text text-muted">Website Url if any</small>
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
							    	onChange={formik.values.totalEmployees}
							    />
						    	<small id="employeesHelp" className="form-text text-muted">Total employees in the company</small>
						  	</div>

						  	<div className="form-group mb-3">
							    <label htmlFor="companyEmail">Email</label>
							    <input 
							    	type="email" 
							    	className="form-control" 
							    	id="companyEmail" 
							    	aria-describedby="companyEmailHelp" 
							    	placeholder="Email" 
							    	value={email}
							    	onChange={(e) => setEmail(e.target.value)}
							    	onChange={formik.values.email}
							    />
						    	<small id="companyEmailHelp" className="form-text text-muted">Email of the company.</small>
						  	</div>

						  	<div className="form-group mb-3">
							    <label htmlFor="companyPhone">Phone Number</label>
							    <input 
							    	type="tel" 
							    	className="form-control" 
							    	id="companyPhone" 
							    	aria-describedby="companyPhoneHelp" 
							    	placeholder="Phone Number" 
							    	value={phoneNumber}
							    	onChange={(e) => setPhoneNumber(e.target.value)}
							    	onChange={formik.values.phoneNumber}
							    />
						    	<small id="companyEmailHelp" className="form-text text-muted">Phone No of the company.</small>
						  	</div>
						  	
							<div style={{margin: '20px 0'}}>
								<label>Choose Industry</label>
								<select 
									className="form-control" 
									name="type"
									onChange={formik.values.industry}
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