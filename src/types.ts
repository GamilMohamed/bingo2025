export interface BingoCell {
  text: string;
  max: number;
  actual: number;
  checked: boolean;
  notes?: string;
}

export interface BingoCellProps {
  index: number;
  id: number;
  cell: BingoCell;
}