import React, { FunctionComponent, useEffect, useState } from "react";
import "./row.component.scss";
import CellComponent from "../cell/cell.component";
import { ICell } from "../../services/letter/table.interface";
import { useSelector } from "react-redux";
import { selectTableConfig } from "../../store/config.reducer";
import { useMakeCellsFallDownHook } from "../../hooks/use-make-cells-fall-down.hook";
import {
  currentlySelectedCells,
  lastSelectedLetter,
  selectCellState,
} from "../../store/table.reducer";
import { selectWordState } from "../../store/words.reducer";
import { cellCanBeSelected } from "../../utils/adjacent-cells.util";

interface RowComponent {
  row: ICell[];
}

const RowComponent: FunctionComponent<RowComponent> = ({ row }) => {
  const [numberOfColumns, setNumberOfColumns] = useState<(ICell | undefined)[]>(
    []
  );
  const tableConfig = useSelector(selectTableConfig);
  const currentWordExist = useSelector(selectWordState).currentWordExist;
  const selectedCells = useSelector(currentlySelectedCells);
  const lastSelected = useSelector(lastSelectedLetter);
  const currentAdjacentCells = useSelector(selectCellState).currentAdjacentCells;

  useEffect(() => {
    const rowWithPossibleMissingCells = useMakeCellsFallDownHook(
      tableConfig.columns,
      row
    );

    setNumberOfColumns(rowWithPossibleMissingCells);
  }, [tableConfig.rows, row]);

  const cellIsLastSelected = (cell: ICell) => lastSelected?.id === cell.id;
  const cellIsSelected = (cell: ICell) => selectedCells.some(({ id }) => id === cell.id);
  const cellIsAdjacent = (cell: ICell) => cellCanBeSelected(currentAdjacentCells, selectedCells, cell);

  return (
    <div className="row">
      {numberOfColumns.map((cell, index) => {
        const currentCell = cell;

        if (!currentCell) {
          return <div className={`row__cell ${index}`} key={index}></div>;
        }
        return (
          <div
            className={
              `row__cell ${currentCell.column} ${index} ` +
                (cellIsLastSelected(cell) && currentWordExist ? "row__cell--lastSelected " : "") +
                (cellIsSelected(cell) ? "row__cell--selected " : "") +
                (cellIsSelected(cell) && currentWordExist ? "row__cell--valid-word" : "") +
                (cellIsAdjacent(cell) ? "row__cell--adjacent" : "")
            }
            key={currentCell.id}
          >
            <CellComponent cell={currentCell} />
          </div>
        );
      })}
    </div>
  );
};

export default RowComponent;
