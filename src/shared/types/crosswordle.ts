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

export type Cell = {
  letter: string
  status: CELL_STATUS
}

export type SelectedCell = {
  i: number
  j: number
}

export type Line = Cell[]
export type Grid = Line[]

export type GameStatus = {
  isModalOpen: boolean
  status: GAME_STATUS
}
