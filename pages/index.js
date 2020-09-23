import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import Head from 'next/head'

import Autocomplete from '@airbnb/lunar/lib/components/Autocomplete'
import { AxisBottom, AxisLeft } from '@visx/axis'
import { Circle } from '@visx/shape'
import { Group } from '@visx/group'
import { scaleLinear } from '@visx/scale'

import useStyles from '@airbnb/lunar/lib/hooks/useStyles'
import { readData, readColumns } from '../lib/readData'

const styleSheet = () => ({
  row: {
    display: 'inline-flex',
  },
})

const FILTER_FIELDS = {
  candidate_gender: {},
  state: {},
  amt_raised_diff_pct_2018: {
    num_buckets: 5,
  },
}

const BREAK_CHAR = ',,,'

// TODO: Sorting doesn't work correct on string dollar values.
// TODO: CSS-in-JS.
// TODO: Sorting assumes it's possible to Number.parseFloat.
// TODO: Memoize.
// TODO: Option cardinality is low, replace autocomplete with dropdown.
// TODO: Toggle for card / list view
// TODO: Use unique persistent keys instead of idx and enable react/no-array-index-key

const dollarToFloat = (dollar) =>
  Number.parseFloat(dollar.replace('$', '').replace(',', ''))
const stringNumToFloat = (str) => Number.parseFloat(str.replace(',', ''))

function Index({ data, columns }) {
  const [styles, cx] = useStyles(styleSheet)
  const [filterOptions, setFilterOptions] = useState({})
  const [hoveredIdx, setHoveredIdx] = useState(-1)

  const filters = Object.keys(FILTER_FIELDS).map((field) => {
    let options = new Set(data.map((row) => row[field]))
    let items = [...options].map((option) => ({
      value: option,
      name: option,
    }))

    const { num_buckets } = FILTER_FIELDS[field]
    if (num_buckets != null) {
      const sortedValues = data
        .map((row) => row[field])
        .sort((a, b) => Number.parseFloat(a) - Number.parseFloat(b))
      options = new Array(num_buckets)
        .fill(0)
        .map((_, idx) =>
          Number.parseFloat(
            sortedValues[Math.floor((sortedValues.length * idx) / num_buckets)]
          )
        )
      items = [...options].map((option, idx) => ({
        value: `${
          idx === 0 ? -Infinity : options[idx - 1]
        }${BREAK_CHAR}${option}`,
        name: `${idx === 0 ? '<' : `${options[idx - 1]} – `}${option}`,
      }))
    }

    return (
      <Autocomplete
        loadItemsOnFocus
        accessibilityLabel={field}
        label={field}
        key={`${field}-autocomplete`}
        name={`${field}-autocomplete`}
        onChange={() => {}}
        onSelectItem={(val) => {
          setFilterOptions({
            ...filterOptions,
            [field]: val,
          })
        }}
        onLoadItems={(value) =>
          Promise.resolve(
            items.filter((item) =>
              item.name.toLowerCase().match(value.toLowerCase())
            )
          )
        }
      />
    )
  })

  const filteredData = data.filter((row, idx) => {
    let shouldRender = true
    if (hoveredIdx > 0 && hoveredIdx !== idx) {
      return false
    }
    Object.keys(filterOptions).forEach((filterOptionKey) => {
      const { num_buckets } = FILTER_FIELDS[filterOptionKey]
      if (filterOptions[filterOptionKey] !== '') {
        if (num_buckets !== undefined) {
          const range = filterOptions[filterOptionKey].split(BREAK_CHAR)
          if (
            Number.parseFloat(row[filterOptionKey]) <
              Number.parseFloat(range[0]) ||
            Number.parseFloat(row[filterOptionKey]) >
              Number.parseFloat(range[1])
          ) {
            shouldRender = false
          }
        } else if (
          row[filterOptionKey].toLowerCase() !==
          filterOptions[filterOptionKey].toLowerCase()
        ) {
          shouldRender = false
        }
      }
    })
    return shouldRender
  })

  const width = 400
  const height = 400
  const margin = 80
  const xField = 'amt_raised_diff_2020'
  const yField = 'vote_diff_2018'

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

  const chart = (
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

  return (
    <div className={styles.container}>
      <Head>
        <title>Donate with Data2thePeople</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Donate</h1>
        <p className={styles.description}>Make every dollar count</p>
        {chart}
        <div className={cx(styles.row)}>{filters}</div>
        <div className={styles.grid}>
          <DataTable
            highlightOnHover
            noHeader
            columns={columns}
            data={filteredData}
          />
        </div>
      </main>

      <footer className={styles.footer}>
        Built with <span className={styles.heart}>&hearts;</span> by
        <img
          src="/favicon-32x32.png"
          alt="Data 2 The People"
          className={styles.logo}
        />
        <a href="https://www.data2thepeople.org">Data 2 the People</a>
      </footer>
    </div>
  )
}

export const getStaticProps = async () => {
  const data = await readData()
  const columns = await readColumns()

  return {
    props: {
      data,
      columns,
    },
  }
}

export default Index
