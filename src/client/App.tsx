import React, {useEffect, useState} from "react";
import "./App.scss";
import {LetterService} from "./services/letter/letter.service";
import {IRow} from "./services/letter/table.interface";
import {useDispatch} from "react-redux";
import LetterTableComponent from "./components/letter-table/letter-table.component";
import CurrentWordComponent from "./components/current-word/current-word.component";
import {WordService} from "./services/word/word.service";
import {setNewWord, setWordList} from "./store/words.reducer";

const letterService = LetterService.getInstance();
const wordService = WordService.getInstance();

function App(): JSX.Element {
  const [rows, setRows] = useState<IRow[]>([]);
  const dispatch = useDispatch();

  const handleAddNewWord = (word: string) => {
    wordService.createNewWord(word)
        .then((newWord) => {
          if (newWord) {
            dispatch(setNewWord(newWord))
          }
        })
  }

  useEffect(() => {
    wordService.getAllWords().then((words) => {
      dispatch(setWordList(words));
      setRows(letterService.createFullTable());
    });
  }, [dispatch]);

  return (
    <div className="App">
      <CurrentWordComponent addNewWord={handleAddNewWord} />
      <LetterTableComponent rows={rows} />
    </div>
  );
}

export default App;
