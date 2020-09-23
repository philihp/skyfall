import React, { useState, useMemo } from 'react'
import DataTable from 'react-data-table-component'
import useStyles from '@airbnb/lunar/lib/hooks/useStyles'

import Button from '@airbnb/lunar/lib/components/Button'
import Spacing from '@airbnb/lunar/lib/components/Spacing'
import Text from '@airbnb/lunar/lib/components/Text'
import { Item } from '@airbnb/lunar/lib/components/Menu'

import Dropdown from '../components/Dropdown'
import Header from '../components/Header'
import Scatterplot from '../components/Scatterplot'
import Map from '../components/Map'
import { FILTER_FIELDS, BREAK_CHAR } from '../setup/config'
import { readData, readColumns } from '../lib/readData'
import { stringNumToFloat } from '../utils/utils'

const styleSheet = () => ({
  center: {
    display: 'flex',
  },
  row: {
    display: 'inline-flex',
    alignItems: 'flex-end',
    margin: 'auto',
  },
})

function Index({ data, columns }) {
  const [styles, cx] = useStyles(styleSheet)
  const [filterOptions, setFilterOptions] = useState({})
  const [hoveredIdx, setHoveredIdx] = useState(-1)

  const menuFieldItems = useMemo(() => {
    const fieldItems = {}
    Object.keys(FILTER_FIELDS).forEach((field) => {
      let options = new Set(data.map((row) => row[field]))
      let items = [...options].map((option) => ({
        value: option,
        name: option,
      }))

      const { numBuckets } = FILTER_FIELDS[field]
      if (numBuckets != null) {
        const sortedValues = data
          .map((row) => row[field])
          .sort((a, b) => stringNumToFloat(a) - stringNumToFloat(b))
        options = new Array(numBuckets)
          .fill(0)
          .map((_, idx) =>
            stringNumToFloat(
              sortedValues[
                Math.floor((sortedValues.length * (idx + 1)) / numBuckets)
              ]
            )
          )
        items = [...options].map((option, idx) => ({
          value: `${
            idx === 0 ? -Infinity : options[idx - 1]
          }${BREAK_CHAR}${option}`,
          name: `${idx === 0 ? '<' : `${options[idx - 1]} to `}${option}`,
        }))
      }

      fieldItems[field] = items
    })
    return fieldItems
  }, [data])

  const filters = Object.keys(FILTER_FIELDS).map((field) => {
    const dropdownItems = menuFieldItems[field].map((item) => (
      <Item
        onClick={() =>
          setFilterOptions({
            ...filterOptions,
            [field]: item.value,
          })
        }
      >
        {item.name}
      </Item>
    ))
    return (
      <Spacing left={3}>
        <Text small bold>
          {field}
        </Text>
        <Dropdown
          label={filterOptions[field] || 'All'}
          accessibilityLabel={field}
        >
          {dropdownItems}
          <Item
            onClick={() =>
              setFilterOptions({
                ...filterOptions,
                [field]: '',
              })
            }
          >
            All
          </Item>
        </Dropdown>
      </Spacing>
    )
  })

  const filteredDataIdxs = data
    .map((row, idx) => idx)
    .filter((idx) => {
      const row = data[idx]
      let shouldRender = true

      Object.keys(filterOptions).forEach((filterOptionKey) => {
        const { numBuckets } = FILTER_FIELDS[filterOptionKey]
        if (filterOptions[filterOptionKey] !== '') {
          if (numBuckets !== undefined) {
            const range = filterOptions[filterOptionKey].split(BREAK_CHAR)
            if (
              stringNumToFloat(row[filterOptionKey]) <
                stringNumToFloat(range[0]) ||
              stringNumToFloat(row[filterOptionKey]) >
                stringNumToFloat(range[1])
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

  const filteredData = filteredDataIdxs
    .filter((idx) => {
      if (hoveredIdx > 0 && hoveredIdx !== idx) {
        return false
      }
      return true
    })
    .map((idx) => data[idx])

  return (
    <div className={styles.container}>
      <Header />
      <Spacing all={3}>
        <div className={cx(styles.center)}>
          <div className={cx(styles.row)}>
            <Map
              filterOptions={filterOptions}
              setFilterOptions={setFilterOptions}
            />
            <Scatterplot
              hoveredIdx={hoveredIdx}
              setHoveredIdx={setHoveredIdx}
              data={data}
              filteredDataIdxs={filteredDataIdxs}
            />
          </div>
        </div>
        <Spacing vertical={3}>
          <div className={cx(styles.center)}>
            <div className={cx(styles.row)}>
              <Button
                small
                onClick={() => {
                  setFilterOptions({})
                }}
              >
                Clear All
              </Button>
              {filters}
            </div>
          </div>
        </Spacing>
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
