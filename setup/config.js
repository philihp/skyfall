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
}
