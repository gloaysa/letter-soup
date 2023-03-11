import React, { FunctionComponent, useEffect } from "react";
import "./current-word.component.scss";
import { useDispatch, useSelector } from "react-redux";
import {
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
  const currentWordExists = useSelector(selectWordState).currentWordExist;
  const selectedCells = useSelector(currentlySelectedCells);
  const dispatch = useDispatch();

  useEffect(() => {
    const currentWord = selectedCells.map(({letter}) => letter.char.value).join('');
    dispatch(setCurrentWord(currentWord));
  }, [selectedCells])

  const handleRemoveWord = () => {
    if (currentWordExists) {
      dispatch(removeCells());
      dispatch(setCurrentWord(""));
      dispatch(setTotalPoints(selectedCells));
    }
  };

  return (
    <section className="current-word">
      <h1>{currentWord?.toUpperCase()}</h1>
      <button onClick={() => addNewWord(currentWord)}>Añadir palabra al diccionario</button>
      <button disabled={!currentWordExists} onClick={() => handleRemoveWord()}>Confirmar</button>
    </section>
  );
};

export default CurrentWordComponent;
