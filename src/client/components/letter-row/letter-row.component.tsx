import React, {FunctionComponent} from "react";
import './letter-row.component.scss';
import {ILetter} from '../../models/letter.model';
import LetterComponent from '../letter/letter.component';

interface ILetterRowComponent {
    letters: ILetter[];
}

const LetterRowComponent: FunctionComponent<ILetterRowComponent> = ({letters}) => {
    return (
        <div className='letter-row'>
            {
                letters.map((letter) => <LetterComponent key={letter.id} letter={letter} />)
            }
        </div>
    )
}

export default LetterRowComponent;
