import React from 'react'
import { render } from 'enzyme'
import Footer from '../Footer'

describe('Footer', () => {
  it('renders Powered by Vercel', () => {
    expect.assertions(1)
    const rendered = render(<Footer />)
    // https://vercel.com/knowledge/can-vercel-sponsor-my-project
    expect(rendered).toMatchSnapshot()
  })
})
