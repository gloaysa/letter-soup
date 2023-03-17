import React, { FunctionComponent } from 'react';
import './hamburger-menu.component.scss';

interface IHamburgerMenuComponent {
	linkList: {
		label: string;
		callback?: () => void;
		link?: string;
	}[];
}
const HamburgerMenuComponent: FunctionComponent<IHamburgerMenuComponent> = ({ linkList }) => {
	return (
		<nav role="navigation">
			<div id="menuToggle">
				<input type="checkbox" />
				<span></span>
				<span></span>
				<span></span>
				<ul id="menu">
					{linkList.map((item) => (
						<a key={item.label} onClick={item.callback}>
							<li>{item.label}</li>
						</a>
					))}
				</ul>
			</div>
		</nav>
	);
};

export default HamburgerMenuComponent;
