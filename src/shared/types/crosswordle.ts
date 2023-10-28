export enum CELL_STATUS {
  EMPTY = 0,
  WRONG,
  NEARBY,
  CORRECT,
  SELECTED,
}

export enum GAME_STATUS {
  IN_GAME = 0,
  WIN,
  LOSE,
}

export type CellType = {
  letter: string
  status: CELL_STATUS
}

export type SelectedCell = {
  i: number
  j: number
}

export type LineType = CellType[]
export type GridType = LineType[]

export type GameStatus = {
  status: GAME_STATUS
}
