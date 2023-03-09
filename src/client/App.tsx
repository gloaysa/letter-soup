import React, {useEffect, useState} from 'react';
import './App.scss';
import {LetterService} from './services/letter/letter.service';
import {IRow} from './services/letter/table.interface';
import {Provider} from 'react-redux';
import store from './store/store';
import LetterTableComponent from './components/letter-table/letter-table.component';
import CurrentWordComponent from './components/current-word/current-word.component';
import {WordService} from "./services/word/word.service";

const letterService = LetterService.getInstance();
const wordService = WordService.getInstance();

function App(): JSX.Element {
    const [rows, setRows] = useState<IRow[]>([]);

    useEffect(() => {
        setRows(letterService.createFullTable());
    }, []);

    return (
        <Provider store={store}>
            <div className="App">
                <CurrentWordComponent />
                <LetterTableComponent rows={rows} />
            </div>
        </Provider>
    );
}

export default App;
