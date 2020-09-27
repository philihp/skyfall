import React from 'react'
import { render } from 'enzyme'
import Header from '../Header'

describe('Header', () => {
  it('renders as expected', () => {
    expect.assertions(1)
    const rendered = render(<Header />)
    expect(rendered).toMatchSnapshot()
  })
})
