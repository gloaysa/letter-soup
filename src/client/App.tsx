import React, { useEffect, useRef } from 'react';
import './App.scss';
import { LetterService } from './services/letter/letter.service';
import { useDispatch, useSelector } from 'react-redux';
import TableComponent from './components/table/table.component';
import { WordService } from './services/word/word.service';
import { restartGame, setWordList } from './store/words.reducer';
import { setTable } from './store/table.reducer';
import { selectTableConfig } from './store/config.reducer';
import HeaderComponent from './components/header/header.component';

const letterService = LetterService.getInstance();
const wordService = WordService.getInstance();

function App(): JSX.Element {
	const headerRef = useRef(null);
	const tableConfig = useSelector(selectTableConfig);
	const dispatch = useDispatch();

	const createNewTable = () => {
		dispatch(setTable(letterService.createFullTable(tableConfig.rows, tableConfig.columns)));
	};

	useEffect(() => {
		wordService.getAllWords().then((words) => {
			dispatch(setWordList(words));
			createNewTable();
		});
	}, [dispatch]);

	const handleRestartGame = () => {
		createNewTable();
		dispatch(restartGame());
	};

	return (
		<div className="App">
			<div ref={headerRef}>
				<HeaderComponent wordService={wordService} onRestartGame={handleRestartGame} />
			</div>
			<TableComponent headerRef={headerRef} />
		</div>
	);
}

export default App;
