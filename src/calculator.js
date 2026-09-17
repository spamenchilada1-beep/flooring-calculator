export const PLANNING_ALLOWANCE = 0.1

export function parseDimension(value, label) {
  if (value === '' || value === null || value === undefined) {
    return { error: `Enter a ${label.toLowerCase()}.` }
  }

  const number = Number(value)
  if (!Number.isFinite(number) || number <= 0) {
    return { error: `${label} must be greater than zero.` }
  }

  return { value: number }
}

export function calculateFlooring({ length, width, coverage }) {
  const parsedLength = parseDimension(length, 'Length')
  const parsedWidth = parseDimension(width, 'Width')
  const parsedCoverage = parseDimension(coverage, 'Box coverage')
  const errors = [parsedLength.error, parsedWidth.error, parsedCoverage.error].filter(Boolean)

  if (errors.length) return { errors }

  const roomArea = parsedLength.value * parsedWidth.value
  const wasteArea = roomArea * PLANNING_ALLOWANCE
  const recommendedArea = roomArea + wasteArea
  const boxes = Math.ceil(recommendedArea / parsedCoverage.value)

  return { roomArea, wasteArea, recommendedArea, boxes, errors: [] }
}

export function formatNumber(value, digits = 1) {
  return Number(value).toFixed(digits)
}

export function createCopyText({ length, width, coverage, result }) {
  return [
    'ATHENA Flooring Calculator',
    `Room: ${length} ft × ${width} ft`,
    `Floor area: ${formatNumber(result.roomArea)} sq ft`,
    `With 10% planning allowance: ${formatNumber(result.recommendedArea)} sq ft`,
    `Coverage per box: ${coverage} sq ft`,
    `Recommended: ${result.boxes} boxes`
  ].join('\n')
}
