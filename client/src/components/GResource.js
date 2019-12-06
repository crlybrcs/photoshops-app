import React from 'react';
import { Limk } from 'react-router-dom';

const GResource = (props) => {
	return (
		<div>
			<ul>
				<li>
					<Link to={`/search/${_id}`} />
				</li>
			</ul>
		</div>
	);
};

export default GResource;
