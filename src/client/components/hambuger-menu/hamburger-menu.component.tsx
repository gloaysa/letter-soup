import React, { FunctionComponent } from 'react';
import './hamburger-menu.component.scss';

const HamburgerMenuComponent: FunctionComponent = () => {
	const linkList = [
		{ label: 'Home', link: '#' },
		{ label: 'About', link: '#' },
		{ label: 'Info', link: '#' },
		{ label: 'Contact', link: '#' },
	];
	return (
		<nav role="navigation">
			<div id="menuToggle">
				<input type="checkbox" />
				<span></span>
				<span></span>
				<span></span>
				<ul id="menu">
					{linkList.map((item) => (
						<a key={item.label} href={item.link}>
							<li>{item.label}</li>
						</a>
					))}
				</ul>
			</div>
		</nav>
	);
};

export default HamburgerMenuComponent;
