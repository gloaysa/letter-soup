import React, { FunctionComponent } from "react";
import "./cell.component.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  currentlySelectedCells,
  lastSelectedLetter,
  selectCellState,
  setLetter,
} from "../../store/table.reducer";
import {
  cellCanBeSelected,
  directionFromOneCellToAnother,
} from "../../utils/adjacent-cells.util";
import { selectWordState, setCurrentWord } from "../../store/words.reducer";
import { ICell } from "../../services/letter/table.interface";

interface ICellComponent {
  cell: ICell;
}

const CellComponent: FunctionComponent<ICellComponent> = ({ cell }) => {
  const currentAdjacentCells = useSelector(selectCellState).currentAdjacentCells;
  const selectedCells = useSelector(currentlySelectedCells);
  const lastSelected = useSelector(lastSelectedLetter);
  const currentWordExist = useSelector(selectWordState).currentWordExist;
  const dispatch = useDispatch();

  const isSelected = selectedCells.some(({ id }) => id === cell.id);
  const isLastSelected = lastSelected?.id === cell.id;
  const isAdjacent = cellCanBeSelected(currentAdjacentCells, selectedCells, cell);
  const orderOfSelection = selectedCells.find(({ id }) => cell.id === id)?.orderOfSelection;
  const nextSelectedCell = orderOfSelection ? selectedCells.find((letter) => letter.orderOfSelection === orderOfSelection + 1) : undefined;
  const previousSelectedLetter = orderOfSelection ? selectedCells.find((letter) => letter.orderOfSelection === orderOfSelection - 1) : undefined;
  const nextCellArrowPosition = directionFromOneCellToAnother(cell, nextSelectedCell);
  const previousCellArrowPosition = directionFromOneCellToAnother(cell, previousSelectedLetter);

  const selectLetter = () => {
    dispatch(setLetter(cell));
    const cells = [...selectedCells, cell];
    const currentWord = cells.map(({letter}) => letter.char.value).join('');
    if (isSelected) {
      const goBack = selectedCells.filter(({ orderOfSelection }) => orderOfSelection <= cell.orderOfSelection
      ).map(({letter}) => letter.char.value).join('');
      dispatch(setCurrentWord(goBack));
    } else {
      dispatch(setCurrentWord(currentWord));
    }

  };

  return (
    <div
      className={
        "letter " +
        (isSelected ? "letter--selected " : "") +
        (isAdjacent ? "letter--adjacent" : "") +
        (isSelected && currentWordExist ? "letter--green" : "")
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
      <span>{cell.letter.char.value}</span>
    </div>
  );
};

export default CellComponent;
