import React, { FunctionComponent, useEffect } from 'react';
import './current-word.component.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectWordState, setCurrentWord } from '../../store/words.reducer';
import { currentlySelectedCells } from '../../store/table.reducer';

interface ICurrentWordComponent {
	addNewWord: (word: string) => void;
}

const CurrentWordComponent: FunctionComponent<ICurrentWordComponent> = ({ addNewWord }) => {
	const currentWord = useSelector(selectWordState).currentWord;
	const selectedCells = useSelector(currentlySelectedCells);
	const dispatch = useDispatch();

	useEffect(() => {
		const currentWord = selectedCells.map(({ letter }) => letter.char.value).join('');
		dispatch(setCurrentWord(currentWord));
	}, [selectedCells]);

	return (
		<section className="current-word">
			<h1>{currentWord?.toUpperCase()}</h1>
			<button onClick={() => addNewWord(currentWord)}>Añadir palabra al diccionario</button>
		</section>
	);
};

export default CurrentWordComponent;
