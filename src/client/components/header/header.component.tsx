import './header.component.scss';
import React, { FunctionComponent } from 'react';
import PointsComponent from '../points/points.component';
import HamburgerMenuComponent from '../hambuger-menu/hamburger-menu.component';
import CurrentWordComponent from '../current-word/current-word.component';

interface IHeaderComponent {
	onAddNewWord: (word: string) => void;
}
const HeaderComponent: FunctionComponent<IHeaderComponent> = ({ onAddNewWord }) => {
	return (
		<header className="header">
			<menu className="header__top-menu">
				<nav role="navigation" className="top-menu__nav">
					<HamburgerMenuComponent />
				</nav>
				<div className="top-menu__points">
					<PointsComponent />
				</div>
			</menu>

			<div className="header__word">
				<CurrentWordComponent addNewWord={onAddNewWord} />
			</div>
		</header>
	);
};

export default HeaderComponent;
