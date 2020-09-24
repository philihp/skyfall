import React from 'react'
import Link from '@airbnb/lunar/lib/components/Link'
import { stringNumToFloat } from '../utils/utils'

export const FILTER_FIELDS = {
  dem_candidate_gender: {},
  state: {},
}

export const FILTER_NAMES = {
  dem_candidate_gender: 'Candidate gender',
  state: 'State',
}

export const D2P_COLORS = {
  red: '#EF4927',
  blue: '#3A4EA1',
  gray: '#B7B7B7',
  green: '#00B36B',
  teal: '#3F98A2',
}

export const BREAK_CHAR = ' to '

export const SCATTERPLOT_X_FIELD = 'amt_raised_ratio_2018'
export const SCATTERPLOT_X_LABEL = 'Ratio Rep:Dem fundraising in 2018'

export const SCATTERPLOT_Y_FIELD = 'vote_diff_2018'
export const SCATTERPLOT_Y_LABEL = 'Difference in votes in 2018'

export const CUSTOM_COLUMN_NAMES = {
  dem_candidate: '',
  state: 'State',
  district: '',
  vote_diff_pct_2018: 'Vote difference in this district, 2018',
  amt_raised_ratio_2018: 'Ratio of Rep:Dem fundraising, 2018',
  amt_raised_ratio_2020: 'Ratio of Rep:Dem fundraising, 2020',
}

export const ACTIVE_COLUMNS = [
  'dem_candidate',
  'district',
  'vote_diff_pct_2018',
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
    return Number.parseFloat(row.amt_raised_ratio_2020).toFixed(2)
  },
  district: (row) => {
    return `${row.state} House district ${row.district}`
  },
  vote_diff_pct_2018: (row) => {
    return `${Number.parseFloat(row.vote_diff_pct_2018 * 100).toFixed(2)} pts`
  },
}

export const CUSTOM_RENDERERS = {
  amt_raised_ratio_2018: [
    {
      when: (row) => stringNumToFloat(row.amt_raised_ratio_2018) < 1,
      style: {
        color: D2P_COLORS.blue,
        fontWeight: 'bold',
      },
    },
    {
      when: (row) => stringNumToFloat(row.amt_raised_ratio_2018) > 1,
      style: {
        color: D2P_COLORS.red,
        fontWeight: 'bold',
      },
    },
  ],
  amt_raised_ratio_2020: [
    {
      when: (row) => stringNumToFloat(row.amt_raised_ratio_2020) < 1,
      style: {
        color: D2P_COLORS.blue,
        fontWeight: 'bold',
      },
    },
    {
      when: (row) => stringNumToFloat(row.amt_raised_ratio_2020) > 1,
      style: {
        color: D2P_COLORS.red,
        fontWeight: 'bold',
      },
    },
  ],
  vote_diff_pct_2018: [
    {
      when: (row) => stringNumToFloat(row.vote_diff_pct_2018) < 0,
      style: {
        color: D2P_COLORS.blue,
        fontWeight: 'bold',
      },
    },
    {
      when: (row) => stringNumToFloat(row.vote_diff_pct_2018) > 0,
      style: {
        color: D2P_COLORS.red,
        fontWeight: 'bold',
      },
    },
  ],
}
