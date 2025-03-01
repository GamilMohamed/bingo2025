export interface BingoCell {
  text: string;
  max: number;
  actual: number;
  checked: boolean;
  notes?: string;
  isPrivate: boolean;
}

export interface BingoCellProps {
  index: number;
  id: number;
  cell: BingoCell;

}
export interface SharedCellProps {
  id: number;
  cell: BingoCell;
}