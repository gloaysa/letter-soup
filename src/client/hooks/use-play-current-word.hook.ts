import { currentlySelectedCells, removeCells } from '../store/table.reducer';
import { selectWordState, setTotalPoints } from '../store/words.reducer';
import { useDispatch, useSelector } from 'react-redux';

/**
 * Use this hook to play the current word (if it exists).
 * It will remove the currently selected cells and score its points.
 */
export const usePlayCurrentWordHook = (): void => {
	const currentWordExist = useSelector(selectWordState).currentWordExist;
	const selectedCells = useSelector(currentlySelectedCells);
	const dispatch = useDispatch();

	if (currentWordExist) {
		dispatch(removeCells());
		dispatch(setTotalPoints(selectedCells));
	}
};
