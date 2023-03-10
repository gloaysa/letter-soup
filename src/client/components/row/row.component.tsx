import React, { FunctionComponent } from "react";
import "./row.component.scss";
import CellComponent from "../cell/cell.component";
import { ICell } from "../../services/letter/table.interface";

interface RowComponent {
  row: ICell[];
}

const RowComponent: FunctionComponent<RowComponent> = ({ row }) => {
  return (
    <div className="letter-row">
      {row.map((cell) => (
        <div className={`${cell.row}`}>
          <CellComponent key={cell.id} cell={cell} />
        </div>
      ))}
    </div>
  );
};

export default RowComponent;
