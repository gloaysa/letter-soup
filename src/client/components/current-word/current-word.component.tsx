import React, { FunctionComponent } from "react";
import "./current-word.component.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectWordState } from "../../store/words.reducer";
import { removeCells } from "../../store/table.reducer";

interface ICurrentWordComponent {
  addNewWord: (word: string) => void;
}

const CurrentWordComponent: FunctionComponent<ICurrentWordComponent> = ({
  addNewWord,
}) => {
  const currentWord = useSelector(selectWordState).currentWord;
  const dispatch = useDispatch();

  return (
    <section className="current-word">
      <h1>{currentWord?.toUpperCase()}</h1>
      <button onClick={() => addNewWord(currentWord)}>Add word</button>
      <button onClick={() => dispatch(removeCells())}>Remove word</button>
    </section>
  );
};

export default CurrentWordComponent;
