import {useState} from 'react'

function Apply() {

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('')
	const [email, setEmail] = useState('')

	return (
		<div>
			<div className="w-50" style={{margin: '0 auto'}}>
				<h4>Add your resume</h4>
				<div className="card">
					<div className="card-body">
	                    <form >

	                    	<div className="">

	                            <label htmlFor="first-name" className="col-form-label"><b>First Name</b></label>
	                            <div className="">
	                                <input
	                                    type="text"
	                                    name="first-name"
	                                    value={firstName}
	                                    onChange={e => setFirstName(e.target.value)}
	                                    required
	                                    className="form-control"
	                                />
	                            </div>
	                        </div>

	                        <div className="">
	                            <label htmlFor="last-name" className="col-form-label"><b>Last Name</b></label>
	                            <div className="">
	                                <input
	                                    type="text"
	                                    name="last-name"
	                                    value={lastName}
	                                    onChange={e => setLastName(e.target.value)}
	                                    required
	                                    className="form-control"
	                                />
	                            </div>
	                        </div>

	                        <div className="">
	                            <label htmlFor="phone" className="col-form-label"><b>Phone</b></label>
	                            <div className="">
	                                <input
	                                    type="tel"
	                                    name="phone"
	                                    value={phoneNumber}
	                                    onChange={e => setPhoneNumber(e.target.value)}
	                                    required
	                                    className="form-control"
	                                />
	                            </div>
	                        </div>



	                        <div className="">
	                            <label htmlFor="email" className="col-form-label"><b>Email</b></label>
	                            <div className="">
	                                <input
	                                    type="email"
	                                    name="email"
	                                    value={email}
	                                    onChange={e => setEmail(e.target.value)}
	                                    required
	                                    className="form-control"
	                                />
	                            </div>
	                        </div>



                            <div className="mt-2 text-align-end">
                                <button type="submit" className="btn btn-primary">Continue</button>
                            </div>
	                    </form>
	                </div>
				</div>
			</div>
		</div>
	)
}


export default Apply