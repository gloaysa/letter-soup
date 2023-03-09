import React, {FunctionComponent} from 'react';
import './current-word.component.scss';
import {useSelector} from 'react-redux';
import {selectLetterState} from '../../store/letter.reducer';

const CurrentWordComponent: FunctionComponent = () => {
    const currentWord = useSelector(selectLetterState).currentWord;
    return (
        <section className="current-word">
            <h1>{currentWord?.toUpperCase()}</h1>
        </section>
    );
}

export default CurrentWordComponent;
