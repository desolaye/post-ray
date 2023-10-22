export const getStatus = (
  correct: string[][],
  current: string[][],
  currentSymbol: string,
  i: number,
  j: number,
) => {
  if (currentSymbol === '@') return 'empty'
  if (correct[i][j] === currentSymbol) return 'correct'

  let lineCount = 0

  for (let k = j + 1; k < correct.length; k++) {
    if (correct[i][k] === '@') break
    if (current[i][k] === currentSymbol) lineCount--
    if (correct[i][k] === currentSymbol && correct[i][k] !== current[i][k]) {
      lineCount++
      break
    }
  }

  if (lineCount > 0) return 'nearby'

  for (let k = j - 1; k >= 0; k--) {
    if (correct[i][k] === '@') break
    if (current[i][k] === currentSymbol) lineCount--
    if (correct[i][k] === currentSymbol) lineCount++
  }

  if (lineCount > 0) return 'nearby'

  let columnCount = 0

  for (let k = i + 1; k < correct.length; k++) {
    if (correct[k][j] === '@') break
    if (current[k][j] === currentSymbol) columnCount--
    if (correct[k][j] === currentSymbol && correct[k][j] !== current[k][j]) {
      columnCount++
      break
    }
  }

  if (columnCount > 0) return 'nearby'

  for (let k = i - 1; k >= 0; k--) {
    if (correct[k][j] === '@') break
    if (current[k][j] === currentSymbol) columnCount--
    if (correct[k][j] === currentSymbol) columnCount++
  }

  if (columnCount > 0) return 'nearby'

  return 'wrong'
}
