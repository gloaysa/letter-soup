import './table.component.scss';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import RowComponent from '../row/row.component';
import { mainTable, setCell } from '../../store/table.reducer';
import { useDispatch, useSelector } from 'react-redux';
import { ITable } from '../../services/letter/table.interface';
import { selectTableConfig } from '../../store/config.reducer';
import { useOrderTableRowsAndColumns } from '../../hooks/use-order-table-rows-and-columns';
import { useOnClickOutsideTwoElementsHook } from '../../hooks/use-on-click-outside-two-elements.hook';

interface ITableComponent {
	headerRef: React.RefObject<HTMLElement>;
}

const TableComponent: FunctionComponent<ITableComponent> = ({ headerRef }) => {
	const [rows, setRows] = useState<ITable>([]);

	const wrapperRef = useRef(null);
	const table = useSelector(mainTable);
	const tableConfig = useSelector(selectTableConfig);
	const dispatch = useDispatch();

	useOnClickOutsideTwoElementsHook(headerRef, wrapperRef, () => {
		dispatch(setCell());
	});

	useEffect(() => {
		const orderedTable = useOrderTableRowsAndColumns(table, tableConfig.rows);
		setRows(orderedTable);
	}, [table]);

	return (
		<section className="table">
			<div className="table__rows" ref={wrapperRef}>
				{rows.map((row, index) => (
					<RowComponent key={index} row={row} />
				))}
			</div>
		</section>
	);
};

export default TableComponent;
