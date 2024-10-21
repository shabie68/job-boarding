import {useEffect} from 'react'

const Aboutme = (props) => {

	useEffect(() => {
		
		if(!document.querySelector('.bj-close').classList.contains('d-none')) {
          props.closeMenu()
        }

	}, [])
	return(
		<div className="gorgeous-mt-70">
			<h3>Who we are</h3>
			<div className="d-flex justify-content-between bj-flex-col-res">
				<p className="gorgeous-w-75">
					Gorgeous, is a forward-thinking technology solutions provider specializing in cloud-based infrastructure, AI-driven analytics, and customized software development. With a team of experienced professionals, Skybridge Innovations helps businesses optimize operations, streamline workflows, and unlock new growth opportunities. Our commitment to excellence and innovative approach ensures that we deliver scalable, secure, and efficient solutions tailored to the unique needs of our clients. Trusted by enterprises across industries, we aim to bridge the gap between today's technology challenges and tomorrow's breakthroughs.
					Currently we have one main office in Pakistan Peshawar and we are working to extend it through out the world
				</p>
				<div className="gorgeous-w-20">
					<img src="images/about.jpg" className="w-100 bj-border-radius" />
				</div>
			</div>
			<section>
				<h4>Our values</h4>
				<ul className="gorgeous-mb-8">
					<li>We love diverse environment, have an unique idea? Just bring it on the table and let's implement it together</li>
					<li>Your success is our responsibility. We celebrate your success</li>
					<li>Our office timing is from 9:00 am to 5:00 pm</li>
					<li>25 paid holidays + your birthday is also a holiday</li>
					<li>Self improvement sessions like on medidations and yoga</li>
					<li>2 times promotion a year</li>
					<li>Home office setup (every 4 years)</li>
				</ul>


			</section>
		</div>
	)
}

export default Aboutme