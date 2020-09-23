import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import Head from 'next/head'

import Autocomplete from '@airbnb/lunar/lib/components/Autocomplete'

import useStyles from '@airbnb/lunar/lib/hooks/useStyles'
import { readData, readColumns } from '../lib/readData'

const styleSheet = () => ({
  row: {
    display: 'inline-flex',
  },
})

const FILTER_FIELDS = {
  office_type: {},
  incumbent_running_2020: {},
  amt_raised_diff_pct_2018: {
    num_buckets: 5,
  },
}

const BREAK_CHAR = ',,,'

// TODO: Sorting doesn't work correct on string dollar values
// TODO: CSS-in-JS
// TODO: Sorting assumes it's possible to parseFloat

function Index({ data, columns }) {
  const [styles, cx] = useStyles(styleSheet)
  const [filterOptions, setFilterOptions] = useState({})

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
        .sort((a, b) => parseFloat(a) - parseFloat(b))
      console.log(sortedValues)
      options = new Array(num_buckets)
        .fill(0)
        .map((_, idx) =>
          parseFloat(
            sortedValues[Math.floor((sortedValues.length * idx) / num_buckets)]
          )
        )
      items = [...options].map((option, idx) => ({
        value: `${
          idx == 0 ? -Infinity : options[idx - 1]
        }${BREAK_CHAR}${option}`,
        name: `${idx == 0 ? '<' : `${options[idx - 1]} – `}${option}`,
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

  const filteredData = data.filter((row) => {
    let shouldRender = true
    Object.keys(filterOptions).forEach((filterOptionKey) => {
      const { num_buckets } = FILTER_FIELDS[filterOptionKey]
      if (filterOptions[filterOptionKey] != '') {
        if (num_buckets != null) {
          const range = filterOptions[filterOptionKey].split(BREAK_CHAR)
          if (
            parseFloat(row[filterOptionKey]) < parseFloat(range[0]) ||
            parseFloat(row[filterOptionKey]) > parseFloat(range[1])
          ) {
            shouldRender = false
          }
        } else if (
          row[filterOptionKey].toLowerCase() !=
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
