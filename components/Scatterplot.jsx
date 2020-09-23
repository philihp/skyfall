import React, { useMemo } from 'react'
import { AxisBottom, AxisLeft } from '@visx/axis'
import { Circle } from '@visx/shape'
import { Group } from '@visx/group'
import { scaleLinear } from '@visx/scale'

import { SCATTERPLOT_X_FIELD, SCATTERPLOT_Y_FIELD } from '../setup/config'
import { dollarToFloat, stringNumToFloat } from '../utils/utils'

export default function Scatterplot({
  width = 400,
  height = 400,
  margin = 80,
  xField = SCATTERPLOT_X_FIELD,
  yField = SCATTERPLOT_Y_FIELD,
  data,
  setHoveredIdx,
}) {
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

  return (
    <svg width={width} height={height}>
      <Group>
        {scatterData.map((point, i) => (
          <Group>
            <Circle
              key={`point-${i}`}
              cx={xScale(point.x)}
              cy={yScale(point.y)}
              r={3}
              fill="#3664fa"
            />
            <Circle
              key={`point-${i}-target`}
              cx={xScale(point.x)}
              cy={yScale(point.y)}
              r={10}
              fill="red"
              opacity={0.04}
              onMouseOver={() => {
                setHoveredIdx(i)
              }}
              onMouseLeave={() => {
                setHoveredIdx(-1)
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
