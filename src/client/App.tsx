import React, { useEffect } from 'react';
import './App.scss';
import { LetterService } from './services/letter/letter.service';
import { useDispatch, useSelector } from 'react-redux';
import TableComponent from './components/table/table.component';
import { WordService } from './services/word/word.service';
import { setNewWord, setWordList } from './store/words.reducer';
import { setTable } from './store/table.reducer';
import { selectTableConfig } from './store/config.reducer';
import HeaderComponent from './components/header/header.component';

const letterService = LetterService.getInstance();
const wordService = WordService.getInstance();

function App(): JSX.Element {
	const tableConfig = useSelector(selectTableConfig);
	const dispatch = useDispatch();

	useEffect(() => {
		wordService.getAllWords().then((words) => {
			dispatch(setWordList(words));
			dispatch(setTable(letterService.createFullTable(tableConfig.rows, tableConfig.columns)));
		});
	}, [dispatch]);

	const handleAddNewWord = (word: string) => {
		wordService.createNewWord(word).then((newWord) => {
			if (newWord) {
				dispatch(setNewWord(newWord));
			}
		});
	};

	return (
		<div className="App">
			<HeaderComponent onAddNewWord={handleAddNewWord} />
			<TableComponent />
		</div>
	);
}

export default App;
