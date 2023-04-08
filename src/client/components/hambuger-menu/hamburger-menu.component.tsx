import React, { FunctionComponent, useState } from 'react';
import './hamburger-menu.component.scss';

interface IHamburgerItem {
	label: string;
	callback?: () => void;
	link?: string;
}

interface IHamburgerMenuComponent {
	linkList: IHamburgerItem[];
}
const HamburgerMenuComponent: FunctionComponent<IHamburgerMenuComponent> = ({ linkList }) => {
	const [checked, setChecked] = useState(false);

	const handleHamburgerClick = (item?: IHamburgerItem) => {
		setChecked(!checked);
		if (item?.callback) {
			item.callback();
		}
	};

	return (
		<nav role="navigation">
			<div id="menuToggle">
				<input type="checkbox" checked={checked} onChange={() => handleHamburgerClick()} />
				<span></span>
				<span></span>
				<span></span>
				<ul id="menu">
					{linkList.map((item) => (
						<a key={item.label} onClick={() => handleHamburgerClick(item)}>
							<li>{item.label}</li>
						</a>
					))}
				</ul>
			</div>
		</nav>
	);
};

export default HamburgerMenuComponent;
