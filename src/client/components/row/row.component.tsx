import React, { FunctionComponent, useEffect, useState } from "react";
import "./row.component.scss";
import CellComponent from "../cell/cell.component";
import { ICell } from "../../services/letter/table.interface";
import { useSelector } from "react-redux";
import { selectTableConfig } from "../../store/config.reducer";
import { useMakeCellsFallDownHook } from "../../hooks/use-make-cells-fall-down.hook";

interface RowComponent {
  row: ICell[];
}

const RowComponent: FunctionComponent<RowComponent> = ({ row }) => {
  const [numberOfColumns, setNumberOfColumns] = useState<(ICell | undefined)[]>([]);
  const tableConfig = useSelector(selectTableConfig);

  useEffect(() => {
    const rowWithPossibleMissingCells = useMakeCellsFallDownHook(tableConfig.columns, row);

    setNumberOfColumns(rowWithPossibleMissingCells);
  }, [tableConfig.rows, row]);

  return (
    <div className="row">
      {numberOfColumns.map((cell, index) => {
        const currentCell = cell;

        if (!currentCell) {
          return (
              <div className={`row__cell ${index}`} key={index}>
              </div>
          );
        }
        return (
            <div className={`row__cell ${currentCell.column} ${index}`} key={currentCell.id}>
              <CellComponent cell={currentCell} />
            </div>
        )
      })}
    </div>
  );
};

export default RowComponent;
