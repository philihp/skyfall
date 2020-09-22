import fs from 'fs'
import path from 'path'
import neatCsv from 'neat-csv'

const publicDir = path.join(process.cwd(), 'public')

export const readData = () => {
  const filePath = path.join(publicDir, 'candidates.csv')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  return neatCsv(fileContents)
}

export const readColumns = () => [
  { name: 'candidate_name', selector: 'candidate_name', sortable: true },
  { name: 'candidate_gender', selector: 'candidate_gender', sortable: true },
  { name: 'candidate_race', selector: 'candidate_race', sortable: true },
  { name: 'state', selector: 'state', sortable: true },
  { name: 'is_gerrymandering', selector: 'is_gerrymandering', sortable: true },
  {
    name: 'is_competitive_senate',
    selector: 'is_competitive_senate',
    sortable: true,
  },
  {
    name: 'is_presidential_swing',
    selector: 'is_presidential_swing',
    sortable: true,
  },
  { name: 'office_type', selector: 'office_type', sortable: true },
  { name: 'district', selector: 'district', sortable: true },
  {
    name: 'clinton_vote_share_2016',
    selector: 'clinton_vote_share_2016',
    sortable: true,
  },
  {
    name: 'dem_state_leg_vote_share_2018',
    selector: 'dem_state_leg_vote_share_2018',
    sortable: true,
  },
  { name: 'dem_votes_2018', selector: 'dem_votes_2018', sortable: true },
  { name: 'rep_votes_2018', selector: 'rep_votes_2018', sortable: true },
  { name: 'vote_diff_2018', selector: 'vote_diff_2018', sortable: true },
  {
    name: 'vote_diff_pct_2018',
    selector: 'vote_diff_pct_2018',
    sortable: true,
  },
  {
    name: 'dem_amt_raised_2018',
    selector: 'dem_amt_raised_2018',
    sortable: true,
  },
  {
    name: 'rep_amt_raised_2018',
    selector: 'rep_amt_raised_2018',
    sortable: true,
  },
  {
    name: 'amt_raised_diff_2018',
    selector: 'amt_raised_diff_2018',
    sortable: true,
  },
  {
    name: 'amt_raised_diff_pct_2018',
    selector: 'amt_raised_diff_pct_2018',
    sortable: true,
  },
  {
    name: 'party_in_seat_pre2020',
    selector: 'party_in_seat_pre2020',
    sortable: true,
  },
  {
    name: 'incumbent_running_2020',
    selector: 'incumbent_running_2020',
    sortable: true,
  },
  {
    name: 'dem_amt_raised_2020',
    selector: 'dem_amt_raised_2020',
    sortable: true,
  },
  {
    name: 'rep_amt_raised_2020',
    selector: 'rep_amt_raised_2020',
    sortable: true,
  },
  {
    name: 'amt_raised_diff_2020',
    selector: 'amt_raised_diff_2020',
    sortable: true,
  },
  {
    name: 'projected_dollars_needed_to_win',
    selector: 'projected_dollars_needed_to_win',
    sortable: true,
  },
  { name: 'donations_needed', selector: 'donations_needed', sortable: true },
]
