import "./table.component.scss";
import React, { FunctionComponent, useEffect, useState } from "react";
import RowComponent from "../row/row.component";
import { selectCellState } from "../../store/table.reducer";
import { useSelector } from "react-redux";
import { ICell, ITable } from "../../services/letter/table.interface";

interface ITableComponent {
  handleWordFound: (cell: ICell) => void;
}

const TableComponent: FunctionComponent = () => {
    const [rows, setRows] = useState<ITable>([]);
    const table = useSelector(selectCellState).table;

    useEffect(() => {
        const tableOrderedByRow: { [key: number]: ICell[] } = table.reduce((result, current) => {
            const valor = current.row;
            if (!result[valor]) {
                result[valor] = [];
            }
            result[valor].push(current);
            return result;
        }, {} as { [key: number]: ICell[] });

        const newRows: ITable = Object.values(tableOrderedByRow).reverse();
        setRows(newRows)
    }, [table])


    return (
        <section className="letter-table">
            {rows.map((row, index) => <RowComponent key={index} row={row}/>)}
        </section>
    );
}

export default TableComponent;
