import React, { FunctionComponent, useEffect, useState } from 'react';
import './current-word.component.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectWordState, setCurrentWord, setNewWord } from '../../store/words.reducer';
import { currentlySelectedCells } from '../../store/table.reducer';
import { BsHandThumbsDown, BsHandThumbsUp, BsSearch } from 'react-icons/bs';
import { ImSpinner3 } from 'react-icons/im';
import { useCreateWordHook } from '../../hooks/use-create-word.hook';
import { WordService } from '../../services/word/word.service';

interface ICurrentWordComponent {
	wordService: WordService;
}

const CurrentWordComponent: FunctionComponent<ICurrentWordComponent> = ({ wordService }) => {
	const [newWordIsWrong, setNewWordIsWrong] = useState<boolean>(false);
	const currentWord = useSelector(selectWordState).currentWord;
	const selectedCells = useSelector(currentlySelectedCells);
	const currentWordExists = useSelector(selectWordState).currentWordExist;
	const { createWord, loading } = useCreateWordHook(wordService);
	const dispatch = useDispatch();

	const wordWrittenButNotExists = currentWord?.length >= 3 && !currentWordExists;

	const handleCreateWord = (word: string) => {
		createWord(word).then((newWord) => {
			if (newWord) {
				dispatch(setNewWord(newWord));
				setNewWordIsWrong(false);
			} else {
				setNewWordIsWrong(true);
			}
		});
	};

	useEffect(() => {
		const currentWord = selectedCells.map(({ letter }) => letter.char.value).join('');
		setNewWordIsWrong(false);
		dispatch(setCurrentWord(currentWord));
	}, [selectedCells]);

	return (
		<section className="current-word">
			<div className="current-word__word">{currentWord?.toUpperCase()}</div>
			{wordWrittenButNotExists && !newWordIsWrong && !loading ? (
				<div onClick={() => handleCreateWord(currentWord)} className="current-word__icon current-word__icon--search">
					<BsSearch />
				</div>
			) : null}

			{newWordIsWrong ? (
				<div className="current-word__icon current-word__icon--wrong">
					<BsHandThumbsDown />
				</div>
			) : null}

			{currentWordExists ? (
				<div className="current-word__icon current-word__icon--exists">
					<BsHandThumbsUp />
				</div>
			) : null}
			{loading ? (
				<div className="current-word__icon current-word__icon--loading">
					<ImSpinner3 />
				</div>
			) : null}
		</section>
	);
};

export default CurrentWordComponent;
