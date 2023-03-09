import './letter-table.component.scss';
import React, {FunctionComponent} from 'react';
import {IRow} from '../../services/letter/table.interface';
import LetterRowComponent from '../letter-row/letter-row.component';

interface ILetterTable {
    rows: IRow[]
}

const LetterTableComponent: FunctionComponent<ILetterTable> = ({rows}) => {
    return (
        <section className="letter-table">
            {
                rows.map((row) => (
                    <LetterRowComponent key={row.rowNumber} letters={row.letters}/>
                ))
            }
        </section>
    );
}

export default LetterTableComponent;
