import { readColumns } from '../readData'

describe('readColumns', () => {
  const expectedColumns = [
    { name: 'candidate_name', selector: 'candidate_name', sortable: true },
    { name: 'candidate_gender', selector: 'candidate_gender', sortable: true },
    { name: 'candidate_race', selector: 'candidate_race', sortable: true },
  ]

  it('has candidate columns', () => {
    expect.assertions(1)
    const columns = readColumns()
    expect(columns).toEqual(expect.arrayContaining(expectedColumns))
  })
})
