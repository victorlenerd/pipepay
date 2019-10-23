import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
	<ul id="footer-links">
		<li>
			<Link to="/terms">Terms</Link>
		</li>
		<li>
			<Link to="/privacy">Privacy Policy</Link>
		</li>
	</ul>
);

export default Footer;
