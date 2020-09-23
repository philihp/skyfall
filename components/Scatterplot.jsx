import React, { useMemo, useState } from 'react'
import { AxisBottom, AxisLeft } from '@visx/axis'
import { Circle } from '@visx/shape'
import { Group } from '@visx/group'
import { scaleLinear } from '@visx/scale'

import { SCATTERPLOT_X_FIELD, SCATTERPLOT_Y_FIELD } from '../setup/config'
import { dollarToFloat, stringNumToFloat } from '../utils/utils'

export default function Scatterplot({
  width = 400,
  height = 320,
  margin = 55,
  xField = SCATTERPLOT_X_FIELD,
  yField = SCATTERPLOT_Y_FIELD,
  data,
  filteredDataIdxs,
  selectedIdx,
  setSelectedIdx,
  setFilterOptions,
}) {
  const [hoveredIdx, setHoveredIdx] = useState(-1)
  const memoData = useMemo(() => {
    let minX = Infinity
    let maxX = -Infinity
    let minY = Infinity
    let maxY = -Infinity
    const scatterData = []

    data.forEach((row) => {
      const x = dollarToFloat(row[xField])
      const y = stringNumToFloat(row[yField])
      minX = Math.min(minX, x)
      maxX = Math.max(maxX, x)
      minY = Math.min(minY, y)
      maxY = Math.max(maxY, y)
      scatterData.push({
        x,
        y,
      })
    })

    const xScale = scaleLinear({
      domain: [minX, maxX],
      range: [margin, width - margin],
    })

    const yScale = scaleLinear({
      domain: [minY, maxY],
      range: [height - margin, margin],
    })

    return {
      scatterData,
      xScale,
      yScale,
    }
    // This should never get recomputed, but we'll add the depency array just in case.
  }, [xField, yField, data, height, width, margin])

  const { scatterData, xScale, yScale } = memoData

  const filteredIdxSet = new Set(filteredDataIdxs)

  return (
    <svg width={width} height={height}>
      <Group cursor="pointer">
        {scatterData.map((point, i) => (
          <Group>
            <Circle
              key={`point-${i}`}
              cx={xScale(point.x)}
              cy={yScale(point.y)}
              stroke="#6f44ff"
              r={hoveredIdx === i ? 4 : 3}
              opacity={
                selectedIdx === i ||
                (selectedIdx === -1 && filteredIdxSet.has(i))
                  ? 1
                  : 0.15
              }
              strokeWidth={hoveredIdx === i ? 3 : 0}
              fill={hoveredIdx === i ? 'white' : '#6f44ff'}
            />
            <Circle
              key={`point-${i}-target`}
              cx={xScale(point.x)}
              cy={yScale(point.y)}
              r={10}
              fill="#6f44ff"
              opacity={
                selectedIdx === i ||
                (selectedIdx === -1 && filteredIdxSet.has(i))
                  ? 0.1
                  : 0
              }
              onMouseOver={() => {
                setHoveredIdx(i)
              }}
              onMouseLeave={() => {
                setHoveredIdx(-1)
              }}
              onClick={() => {
                setSelectedIdx(i)
                setFilterOptions({})
              }}
            />
          </Group>
        ))}
      </Group>
      <AxisLeft scale={yScale} left={margin} label={yField} />
      <AxisBottom
        top={height - margin}
        scale={xScale}
        label={xField}
        numTicks={4}
      />
    </svg>
  )
}
