import { z } from 'zod'

const CrosswordleCell = z.string().min(1).max(1)

const CrosswordleLine = z.object({
  0: z.array(CrosswordleCell).min(2).max(2).optional(),
  1: z.array(CrosswordleCell).min(2).max(2).optional(),
  2: z.array(CrosswordleCell).min(2).max(2).optional(),
  3: z.array(CrosswordleCell).min(2).max(2).optional(),
  4: z.array(CrosswordleCell).min(2).max(2).optional(),
  5: z.array(CrosswordleCell).min(2).max(2).optional(),
  6: z.array(CrosswordleCell).min(2).max(2).optional(),
})

export const CrosswordleZod = z.object({
  day: z.number(),
  shuffles: z.number(),
  crossword: z.array(CrosswordleLine).min(6).max(7),
})

export type CrosswordleCellType = z.infer<typeof CrosswordleCell>[]
export type CrosswordleLineType = z.infer<typeof CrosswordleLine>
export type CrosswordleType = z.infer<typeof CrosswordleZod>
