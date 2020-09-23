import { dollarToFloat } from '../utils/utils'

export const FILTER_FIELDS = {
  candidate_gender: {},
  state: {},
  vote_diff_2018: {
    numBuckets: 5,
  },
}

export const BREAK_CHAR = ' to '

export const SCATTERPLOT_X_FIELD = 'amt_raised_diff_pct_2018'

export const SCATTERPLOT_Y_FIELD = 'vote_diff_2018'

export const CUSTOM_COLUMN_NAMES = {
  candidate_name: '',
  projected_dollars_needed_to_win: 'Dollars to Win',
}

export const ACTIVE_COLUMNS = new Set([
  'candidate_name',
  'office_type',
  'state',
  'district',
  'incumbent_running_2020',
  'vote_diff_pct_2018',
  'amt_raised_diff_2018',
  'dem_amt_raised_2020',
  'rep_amt_raised_2020',
  'amt_raised_diff_2020',
])

export const CUSTOM_RENDERERS = {
  amt_raised_diff_2020: [
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
    conditionalCellStyles: [
      {
        when: (row) => row.amt_raised_diff_2020 < 0,
        style: {
          backgroundColor: 'rgba(242, 38, 19, 0.9)',
          color: 'white',
        },
      },
      {
        when: (row) => row.amt_raised_diff_2020 > 0,
        style: {
          backgroundColor: 'rgba(19, 38, 242, 0.9)',
          color: 'white',
        },
      },
    ],
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

export const namedAndStyledColumns = activeColumns.map((col) => ({
  ...col,
  conditionalCellStyles:
    CUSTOM_RENDERERS[col.selector] === undefined
      ? []
      : CUSTOM_RENDERERS[col.selector],
  name:
    CUSTOM_COLUMN_NAMES[col.selector] !== undefined
      ? CUSTOM_COLUMN_NAMES[col.selector]
      : `${col.selector[0].toUpperCase()}${col.selector
          .replace('_', ' ')
          .slice(1)}`,
}))
