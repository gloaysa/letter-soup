import React, { FunctionComponent } from "react";
import "./current-word.component.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTotalPoints,
  selectWordState,
  setCurrentWord,
  setTotalPoints,
} from "../../store/words.reducer";
import { currentlySelectedCells, removeCells } from "../../store/table.reducer";

interface ICurrentWordComponent {
  addNewWord: (word: string) => void;
}

const CurrentWordComponent: FunctionComponent<ICurrentWordComponent> = ({
  addNewWord,
}) => {
  const currentWord = useSelector(selectWordState).currentWord;
  const selectedCells = useSelector(currentlySelectedCells);
  const totalPoints = useSelector(selectTotalPoints);
  const dispatch = useDispatch();

  const handleRemoveWord = () => {
    dispatch(removeCells());
    dispatch(setCurrentWord(""));
    dispatch(setTotalPoints(selectedCells));
  };

  return (
    <section className="current-word">
      <h1>{currentWord?.toUpperCase()}</h1>
      <button onClick={() => addNewWord(currentWord)}>Añadir palabra al diccionario</button>
      <button onClick={() => handleRemoveWord()}>Confirmar</button>
      {totalPoints ? <p>{totalPoints}</p> : null}
    </section>
  );
};

export default CurrentWordComponent;
