import { z } from 'zod'

const BackendCellZod = z.string().min(1).max(1)

const BackendLineZod = z.object({
  0: z.array(BackendCellZod).min(2).max(2).optional(),
  1: z.array(BackendCellZod).min(2).max(2).optional(),
  2: z.array(BackendCellZod).min(2).max(2).optional(),
  3: z.array(BackendCellZod).min(2).max(2).optional(),
  4: z.array(BackendCellZod).min(2).max(2).optional(),
  5: z.array(BackendCellZod).min(2).max(2).optional(),
  6: z.array(BackendCellZod).min(2).max(2).optional(),
})

const BackendCrosswordZod = z.array(BackendLineZod).min(6).max(7)

export const BackendDataZod = z.object({
  day: z.number(),
  shuffles: z.number(),
  crossword: BackendCrosswordZod,
})

export type BackendCellType = z.infer<typeof BackendCellZod>[]
export type BackendLineType = z.infer<typeof BackendLineZod>
export type BackendCrosswordType = z.infer<typeof BackendCrosswordZod>
export type BackendDataType = z.infer<typeof BackendDataZod>
