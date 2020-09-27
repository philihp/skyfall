import React from 'react'
import { render } from 'enzyme'
import Intro from '../Intro'

describe('Intro', () => {
  it('renders as expected', () => {
    expect.assertions(1)
    const rendered = render(<Intro />)
    expect(rendered).toMatchSnapshot()
  })
})
