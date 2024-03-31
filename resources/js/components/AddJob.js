import {useState} from 'react'




function AddJob() {

	const [title, setTitle] = useState('Job Title');
	const [description, setDescription] = useState('Dummy description');
	const [location, setLocation] = useState('Islamabad');
	const [jobType, setJobType] = useState('remote');
	const [jobResponsibilites, setJobResponsibilities] = useState('Dummy Responsibilities');
	const [jobRequirements, setJobRequirements] = useState('Dummy Job Requirements');
	const [salary, setSalary] = useState(40000);

	async function addJob() {

		const data = {
			title: title,
			description: description,
			location: location,
			job_type: jobType,
			job_responsibilities: jobResponsibilites,
			job_requirements: jobRequirements,
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
					<label >Job Requirements</label>
					<textarea type="text" name="job_requirements" className="form-control" onChange={(e) => {setJobRequirements(e.target.value)}}/>
				</div>

				<div className="text-align-end">
					<button className="btn btn-primary text-align-end" onClick={addJob}>Add Job</button>
				</div>
			</div>
		</div>
	)
}

export default AddJob;

