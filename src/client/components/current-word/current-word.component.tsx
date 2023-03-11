import React, { FunctionComponent, useEffect } from 'react';
import './current-word.component.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectWordState, setCurrentWord } from '../../store/words.reducer';
import { currentlySelectedCells } from '../../store/table.reducer';
import { GrSearchAdvanced } from 'react-icons/gr';

interface ICurrentWordComponent {
	addNewWord: (word: string) => void;
}

const CurrentWordComponent: FunctionComponent<ICurrentWordComponent> = ({ addNewWord }) => {
	const currentWord = useSelector(selectWordState).currentWord;
	const selectedCells = useSelector(currentlySelectedCells);
	const currentWordExists = useSelector(selectWordState).currentWordExist;
	const dispatch = useDispatch();

	const wordWrittenButNotExists = currentWord?.length >= 3 && !currentWordExists;

	useEffect(() => {
		const currentWord = selectedCells.map(({ letter }) => letter.char.value).join('');
		dispatch(setCurrentWord(currentWord));
	}, [selectedCells]);

	return (
		<section className="current-word">
			<div className="current-word__word">{currentWord?.toUpperCase()}</div>
			<div className="current-word__search">{wordWrittenButNotExists ? <GrSearchAdvanced /> : null}</div>
		</section>
	);
};

export default CurrentWordComponent;
