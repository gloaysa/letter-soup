import './header.component.scss';
import React, { FunctionComponent } from 'react';
import PointsComponent from '../points/points.component';
import HamburgerMenuComponent from '../hambuger-menu/hamburger-menu.component';
import CurrentWordComponent from '../current-word/current-word.component';
import { WordService } from '../../services/word/word.service';

interface IHeaderComponent {
	wordService: WordService;
	onRestartGame: () => void;
}
const HeaderComponent: FunctionComponent<IHeaderComponent> = ({ wordService, onRestartGame }) => {
	const linkList = [
		{ label: 'Inicio', link: '#' },
		{ label: 'Reiniciar Partida', link: '#', callback: onRestartGame },
		{ label: 'Terminar Partida', link: '#' },
		{ label: 'Ver puntuación', link: '#' },
	];
	return (
		<header className="header">
			<menu className="header__top-menu">
				<nav role="navigation" className="top-menu__nav">
					<HamburgerMenuComponent linkList={linkList} />
				</nav>
				<div className="top-menu__points">
					<PointsComponent />
				</div>
			</menu>

			<div className="header__word">
				<CurrentWordComponent wordService={wordService} />
			</div>
		</header>
	);
};

export default HeaderComponent;
