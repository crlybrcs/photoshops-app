import React from 'react';

const About = (props) => {
	return (
		<div>
			<br></br>
			<br></br>
			<br></br>
			<h1>About Photophops</h1>
			<article>
				Photophops is a retail oriented application that pairs customers with products. With Photoshops, you as a costumer simply need to take a picture of what it is that you want and then our app will take over from there. 
			</article>
			<article>
				Photoshops uses two APIs primamrly, Google Vision Api and Zink's Api.
				Google Vision is used to anaylze the images that our customers upload and afterwards it sends us the data we need to determine what the customer wishes to purchase. Zink is used to access our vendor's data. Photoshops was created and developed by Kyle Chorley, Tatiana Mets, and Stephen Coley.
			</article>
		</div>
	);
};

export default About;
