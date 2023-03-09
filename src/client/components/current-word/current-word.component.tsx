import React, {FunctionComponent} from 'react';
import './current-word.component.scss';
import {useSelector} from 'react-redux';
import {selectLetterState} from '../../store/letter.reducer';

interface ICurrentWordComponent {
    addNewWord: (word: string) => void;
}

const CurrentWordComponent: FunctionComponent<ICurrentWordComponent> = ({addNewWord}) => {
    const currentWord = useSelector(selectLetterState).currentWord;
    return (
        <section className="current-word">
            <h1>{currentWord?.toUpperCase()}</h1>
            <button onClick={() => addNewWord(currentWord)}>Add word</button>
        </section>
    );
}

export default CurrentWordComponent;
