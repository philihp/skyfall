import React from 'react'
import Link from '@airbnb/lunar/lib/components/Link'
import { dollarToFloat } from '../utils/utils'

export const FILTER_FIELDS = {
  candidate_gender: {},
  state: {},
  vote_diff_2018: {
    numBuckets: 5,
  },
}

export const BREAK_CHAR = ' to '

export const SCATTERPLOT_X_FIELD = 'amt_raised_ratio_2018'

export const SCATTERPLOT_Y_FIELD = 'vote_diff_2018'

export const CUSTOM_COLUMN_NAMES = {
  dem_candidate: '',
  // 'office_type',
  state: 'State',
  district: 'District',
  amt_raised_ratio_2018: 'Ratio of Rep:Dem fundraising, 2018',
  amt_raised_ratio_2020: 'Ratio of Rep:Dem fundraising, 2020',
}

export const ACTIVE_COLUMNS = [
  'dem_candidate',
  'state',
  'office_type',
  'district',
  'amt_raised_ratio_2018',
  'amt_raised_ratio_2020',
]

export const CUSTOM_COLUMN_FORMATTERS = {
  dem_candidate: (row) => {
    return (
      <Link href={row.dem_candidate_website} target="_blank">
        {row.dem_candidate}
      </Link>
    )
  },
  amt_raised_ratio_2018: (row) => {
    return Number.parseFloat(row.amt_raised_ratio_2018).toFixed(2)
  },
  amt_raised_ratio_2020: (row) => {
    return Number.parseFloat(row.amt_raised_ratio_2018).toFixed(2)
  },
}

export const CUSTOM_RENDERERS = {
  amt_raised_ratio_2018: [
    {
      when: (row) => dollarToFloat(row.amt_raised_diff_2020) < 0,
      style: {
        backgroundColor: 'rgba(242, 38, 19, 0.9)',
        color: 'white',
      },
    },
    {
      when: (row) => dollarToFloat(row.amt_raised_diff_2020) > 0,
      style: {
        backgroundColor: 'rgba(19, 38, 242, 0.9)',
        color: 'white',
      },
    },
  ],
}
