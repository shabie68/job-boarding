import {useState, useEffect, useCallback} from 'react'
import Quill from 'quill';

import Toolbar from "quill/modules/toolbar";
import Snow from "quill/themes/snow";

import Bold from "quill/formats/bold";
import Italic from "quill/formats/italic";
import Header from "quill/formats/header";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

function Profile() {

	const [email, setEmail] = useState();
	const [address, setAdress] = useState();
	const [phoneNumber, setPhoneNumber] = useState();

	return (
		 <div>
            <div className="container pt-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">
                                Profile
                            </div>

                            <div className="card-body">

	                            <div className="form-group row mb-3">
								    <label for="exampleFormControlTextarea1" className="col-md-4 col-form-label text-md-end" >Example textarea</label>
								    <div className="col-md-6">
								    	<textarea id="exampleFormControlTextarea1" rows="3" className="form-control"></textarea>
								    </div>
								    
								</div>


                                <div className="row mb-3">
                                    <label htmlFor="email" className="col-md-4 col-form-label text-md-end">Email Address</label>
                                    <div className="col-md-6">
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            required
                                            className="form-control"
                                        />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label htmlFor="email" className="col-md-4 col-form-label text-md-end">Phone Number</label>
                                    <div className="col-md-6">
                                        <input
                                            type="tel"
                                            name="phone_number"
                                            placeholder="Phone Number"
                                            value={phoneNumber}
                                            onChange={e => setPhoneNumber(e.target.value)}
                                            required
                                            className="form-control"
                                        />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label htmlFor="email" className="col-md-4 col-form-label text-md-end">Address</label>
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            name="address"
                                            placeholder="Password"
                                            value={address}
                                            onChange={e => setAddress(e.target.value)}
                                            required
                                            className="form-control"
                                        />
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	)
}

export default Profile