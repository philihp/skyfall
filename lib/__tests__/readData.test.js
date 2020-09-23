import { namedAndStyledColumns } from '../../setup/config'

describe('namedAndStyledColumns', () => {
  it('has candidate columns', () => {
    expect.assertions(1)
    const columns = namedAndStyledColumns
    expect(columns[0].selector).toEqual('candidate_name')
  })
})
