import fs from 'fs'
import path from 'path'
import neatCsv from 'neat-csv'

import { ACTIVE_COLUMNS, CUSTOM_COLUMN_NAMES } from '../setup/config'

const publicDir = path.join(process.cwd(), 'public')

export const readData = () => {
  const filePath = path.join(publicDir, 'candidates.csv')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  return neatCsv(fileContents)
}

export const readColumns = () => {
  const rawColumns = [
    { selector: 'candidate_name', sortable: true },
    { selector: 'candidate_gender', sortable: true },
    { selector: 'candidate_race', sortable: true },
    { selector: 'state', sortable: true },
    {
      selector: 'is_gerrymandering',
      sortable: true,
    },
    {
      selector: 'is_competitive_senate',
      sortable: true,
    },
    {
      selector: 'is_presidential_swing',
      sortable: true,
    },
    { selector: 'office_type', sortable: true },
    { selector: 'district', sortable: true },
    {
      selector: 'clinton_vote_share_2016',
      sortable: true,
    },
    {
      selector: 'dem_state_leg_vote_share_2018',
      sortable: true,
    },
    { selector: 'dem_votes_2018', sortable: true },
    { selector: 'rep_votes_2018', sortable: true },
    { selector: 'vote_diff_2018', sortable: true },
    {
      selector: 'vote_diff_pct_2018',
      sortable: true,
    },
    {
      selector: 'dem_amt_raised_2018',
      sortable: true,
    },
    {
      selector: 'rep_amt_raised_2018',
      sortable: true,
    },
    {
      selector: 'amt_raised_diff_2018',
      sortable: true,
    },
    {
      selector: 'amt_raised_diff_pct_2018',
      sortable: true,
    },
    {
      selector: 'party_in_seat_pre2020',
      sortable: true,
    },
    {
      selector: 'incumbent_running_2020',
      sortable: true,
    },
    {
      selector: 'dem_amt_raised_2020',
      sortable: true,
    },
    {
      selector: 'rep_amt_raised_2020',
      sortable: true,
    },
    {
      selector: 'amt_raised_diff_2020',
      sortable: true,
    },
    {
      selector: 'projected_dollars_needed_to_win',
      sortable: true,
    },
    { selector: 'donations_needed', sortable: true },
  ]

  const activeColumns = rawColumns.filter((col) =>
    ACTIVE_COLUMNS.has(col.selector)
  )

  const namedAndStyledColumns = activeColumns.map((col) => ({
    ...col,
    name:
      CUSTOM_COLUMN_NAMES[col.selector] !== undefined
        ? CUSTOM_COLUMN_NAMES[col.selector]
        : `${col.selector[0].toUpperCase()}${col.selector
            .replaceAll('_', ' ')
            .slice(1)}`,
  }))

  return namedAndStyledColumns
}
