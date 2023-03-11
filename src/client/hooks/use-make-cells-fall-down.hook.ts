import {ICell} from '../services/letter/table.interface';

/**
 * If the row passed has missing cell in a particular column, returns undefined where the cell should be.
 * That allows to create the effect of cells "falling down" in the template.
 * @param numberOfColumns
 * @param row
 */
export const useMakeCellsFallDownHook = (numberOfColumns: number, row: ICell[]): (ICell | undefined)[] => {
    let newRow: (ICell | undefined)[];
    const array = Array.from(Array(numberOfColumns).keys()).map((num) => ({column: num + 1}));
    if (row?.length < array.length) {
        newRow = array.map((item) => {
            const found = row.find(({column}) => (item.column) === column);
            return found ? found : undefined;
        })
    } else {
        newRow = row;
    }
    return newRow;
}
