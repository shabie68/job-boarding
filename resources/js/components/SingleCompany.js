import { useParams, useLocation } from 'react-router-dom';


const SingleCompany = () => {


	const { id } = useParams();
	const location = useLocation();



	return(
		<div>
			{location.state?.company?.title}
		</div>
	)
}

export default SingleCompany