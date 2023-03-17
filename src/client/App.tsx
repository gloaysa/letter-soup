import React, { useEffect, useRef } from 'react';
import './App.scss';
import { LetterService } from './services/letter/letter.service';
import { useDispatch, useSelector } from 'react-redux';
import TableComponent from './components/table/table.component';
import { WordService } from './services/word/word.service';
import { restartGame, selectWordState } from './store/words.reducer';
import { selectMainTable, setTable } from './store/table.reducer';
import { selectTableConfig } from './store/config.reducer';
import HeaderComponent from './components/header/header.component';
import { useGetAllWordsHook } from './hooks/use-get-all-words.hook';
import SpinnerComponent from './components/spinner/spinner.component';

const letterService = LetterService.getInstance();
const wordService = WordService.getInstance();

function App(): JSX.Element {
	const headerRef = useRef(null);
	const tableConfig = useSelector(selectTableConfig);
	const words = useSelector(selectWordState).wordList;
	const table = useSelector(selectMainTable);
	const dispatch = useDispatch();

	const createNewTable = () => {
		dispatch(setTable(letterService.createFullTable(tableConfig.rows, tableConfig.columns)));
	};

	const { loading } = useGetAllWordsHook(wordService, dispatch, words);

	useEffect(() => {
		if (!table.length && words.length) {
			createNewTable();
		}
	});

	const handleRestartGame = () => {
		createNewTable();
		dispatch(restartGame());
	};

	return (
		<div className="App">
			<div ref={headerRef}>
				<HeaderComponent wordService={wordService} onRestartGame={handleRestartGame} />
			</div>
			{loading ? <SpinnerComponent /> : <TableComponent headerRef={headerRef} />}
		</div>
	);
}

export default App;
