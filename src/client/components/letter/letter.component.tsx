import React, {FunctionComponent} from "react";
import {ILetter} from "../../models/letter.model";
import "./letter.component.scss";
import {useDispatch, useSelector} from "react-redux";
import {selectLetterState, setLetter} from "../../store/letter.reducer";
import {cellCanBeSelected, directionFromOneCellToAnother,} from "../../utils/adjacent-cells.util";
import {setCurrentWord} from '../../store/words.reducer';

interface ILetterComponent {
  letter: ILetter;
}

const LetterComponent: FunctionComponent<ILetterComponent> = ({ letter }) => {
  const currentAdjacentCells = useSelector(selectLetterState).currentAdjacentCells;
  const selectedLetters = useSelector(selectLetterState).selectedLetters;
  const lastSelected = useSelector(selectLetterState).lastSelected;
  const dispatch = useDispatch();
  const isSelected = selectedLetters.some(({ id }) => id === letter.id);
  const isLastSelected = lastSelected?.id === letter.id;
  const isAdjacent = cellCanBeSelected(currentAdjacentCells, selectedLetters.map(({ cell }) => cell), letter.cell);
  const orderOfSelection = selectedLetters.find(({ id }) => letter.id === id)?.orderOfSelection;
  const nextSelectedLetter = orderOfSelection ? selectedLetters.find((letter) => letter.orderOfSelection === orderOfSelection + 1) : undefined;
  const previousSelectedLetter = orderOfSelection ? selectedLetters.find((letter) => letter.orderOfSelection === orderOfSelection - 1) : undefined;
  const nextCellArrowPosition = directionFromOneCellToAnother(letter.cell, nextSelectedLetter?.cell);
  const previousCellArrowPosition = directionFromOneCellToAnother(letter.cell, previousSelectedLetter?.cell);

  const selectLetter = () => {
    dispatch(setLetter(letter));
    const letters = [...selectedLetters, letter];
    const currentWord = letters.map(({char}) => char.value).join('');
    dispatch(setCurrentWord(currentWord));
  };

  return (
    <div
      className={
        "letter " +
        (isSelected ? "letter--selected " : "") +
        (isAdjacent ? "letter--adjacent" : "")
      }
      onClick={() => selectLetter()}
    >
      <div
          className={
              (previousCellArrowPosition ? "line pre " : "") +
              (previousCellArrowPosition === "h-right" ? "line--h line--right " : "") +
              (previousCellArrowPosition === "h-left" ? "line--h line--left " : "") +
              (previousCellArrowPosition === "v-top" ? "line--v line--top " : "") +
              (previousCellArrowPosition === "v-bottom" ? "line--v line--bottom " : "") +
              (previousCellArrowPosition === "d-up-left" ? "line--d-up-left " : "") +
              (previousCellArrowPosition === "d-up-right" ? "line--d-up-right " : "") +
              (previousCellArrowPosition === "d-down-left" ? "line--d-down-left " : "") +
              (previousCellArrowPosition === "d-down-right" ? "line--d-down-right " : "")
          }
      ></div>
      <div
          className={
              (nextCellArrowPosition ? "line post " : "") +
              (nextCellArrowPosition === "h-right" ? "line--h line--right " : "") +
              (nextCellArrowPosition === "h-left" ? "line--h line--left " : "") +
              (nextCellArrowPosition === "v-top" ? "line--v line--top " : "") +
              (nextCellArrowPosition === "v-bottom" ? "line--v line--bottom " : "") +
              (nextCellArrowPosition === "d-up-left" ? "line--d-up-left " : "") +
              (nextCellArrowPosition === "d-up-right" ? "line--d-up-right " : "") +
              (nextCellArrowPosition === "d-down-left" ? "line--d-down-left " : "") +
              (nextCellArrowPosition === "d-down-right" ? "line--d-down-right " : "")
          }
      ></div>
      <div
          className={
              (isLastSelected && previousCellArrowPosition === "h-right" ? "line line--h line-last-selected--right " : "") +
              (isLastSelected && previousCellArrowPosition === "h-left" ? "line line--h line-last-selected--left " : "") +
              (isLastSelected && previousCellArrowPosition === "v-top" ? "line line--v line-last-selected--top " : "") +
              (isLastSelected && previousCellArrowPosition === "v-bottom" ? "line line--v line-last-selected--bottom " : "")
          }
      ></div>
      <span>{letter.char.value}</span>
    </div>
  );
};

export default LetterComponent;
