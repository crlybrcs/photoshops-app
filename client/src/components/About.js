import React from 'react';

const About = (props) => {
	return (
		<div>
			<h1 className="block-header">About Photophops</h1>
			<p className="block-p">
				Photophops is a retail-oriented application that pairs customers with products. With Photoshops, you as
				a customer, simply need to take a picture of what it is that you want and then our app will take over
				from there.
			</p>
			<p className="block-p">
				Photoshops uses two APIs primarily, Google Vision API and Zinc API. Google Vision is used to anaylze the
				images that our customers upload and afterwards it sends us the data we need to determine what the
				customer wishes to purchase. Zinc API is used to analyze and transfer data to the vendor. Photoshops was
				created and developed by Kyle Chorley, Tetiana Mets, and Stephen Coley.
			</p>
		</div>
	);
};

export default About;
