const Contact = () => {
	
	return (
		<div className="row justify-content-center">
	                <div className="col-md-8">
	                	<form className="w-75 m-auto">
	                		<h3 className="text-two">Send us a message</h3>
		                        

		                    <div className="bj-border bj-border-radius bg-one p-4">
		                    	<div>
		                            <div className="mb-3 d-flex justify-content-between">
		                                <strong><label htmlFor="email" className="col-form-label">Name</label></strong>
		                                <div className="w-75">
		                                    <input
		                                        type="text"
		                                        name="name"
		                                        required
		                                        className="bj-input bg-one"
		                                    />
		                                </div>
		                            </div>
		                        </div>


		                        <div>
		                            <div className="mb-3 d-flex justify-content-between">
		                                <strong><label htmlFor="email" className="col-form-label">Email</label></strong>
		                                <div className="w-75">
		                                    <input
		                                        type="email"
		                                        name="email"
		                                        required
		                                        className="bj-input bg-one"
		                                    />
		                                </div>
		                            </div>
		                        </div>  

		                        <div>
		                            <div className="mb-3 d-flex justify-content-between">
		                                <strong><label htmlFor="email" className="col-form-label">Subject</label></strong>
		                                <div className="w-75">
		                                    <input
		                                        type="text"
		                                        name="name"
		                                        required
		                                        className="bj-input bg-one"
		                                    />
		                                </div>
		                            </div>
		                        </div>  

		                        <div className="form-group mb-3 d-flex justify-content-between">
	                                <strong><label htmlFor="exampleFormControlTextarea1" className="col-form-label bj-text-bold">Your Message</label></strong>
	                                <div className="w-75">
	                                    <textarea id="exampleFormControlTextarea1" name="summary" rows="3" className="bj-input bg-one"></textarea>
	                                </div>
	                            </div>
		                    </div>

		                    <div className="text-end my-2">
                                <button className="btn text-prime bj-btn-prime" type="submit">Submit</button>
                            </div>
	                    </form>
	                </div>
	            </div>
	)
}

export default Contact