import "./table.component.scss";
import React, { FunctionComponent, useEffect, useState } from "react";
import RowComponent from "../row/row.component";
import { selectCellState } from "../../store/table.reducer";
import { useSelector } from "react-redux";
import { ICell, ITable } from "../../services/letter/table.interface";
import { selectTableConfig } from "../../store/config.reducer";
import { useOrderTableRowsAndColumns } from "../../hooks/use-order-table-rows-and-columns";

interface ITableComponent {
  handleWordFound: (cell: ICell) => void;
}

const TableComponent: FunctionComponent = () => {
    const [rows, setRows] = useState<ITable>([]);
    const table = useSelector(selectCellState).table;
    const tableConfig = useSelector(selectTableConfig);

    useEffect(() => {
        const orderedTable = useOrderTableRowsAndColumns(table, tableConfig.rows);
        setRows(orderedTable)
    }, [table])


    return (
        <section className="letter-table">
            {rows.map((row, index) => <RowComponent key={index} row={row}/>)}
        </section>
    );
}

export default TableComponent;
