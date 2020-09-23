import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import useStyles from '@airbnb/lunar/lib/hooks/useStyles'

import Autocomplete from '@airbnb/lunar/lib/components/Autocomplete'
import Spacing from '@airbnb/lunar/lib/components/Spacing'

import Header from '../components/Header'
import Scatterplot from '../components/Scatterplot'
import { FILTER_FIELDS, BREAK_CHAR } from '../setup/config'
import { readData, readColumns } from '../lib/readData'

const styleSheet = () => ({
  row: {
    display: 'flex',
    alignItems: 'center',
  },
})

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

  return (
    <div className={styles.container}>
      <Header />
      <Spacing all={2}>
        <Scatterplot setHoveredIdx={setHoveredIdx} data={data} />
        <div className={cx(styles.row)}>{filters}</div>
        <DataTable
          highlightOnHover
          noHeader
          columns={columns}
          data={filteredData}
        />
      </Spacing>
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
