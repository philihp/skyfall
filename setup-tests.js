import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import lunar from '@airbnb/lunar'

// LUNAR Setup

React.useLayoutEffect = React.useEffect
lunar.initialize({
  defaultLocale: 'en',
  defaultTimezone: 'UTC',
  name: 'skyfall',
})

// Configure Enzyme with React 16 adapter
Enzyme.configure({ adapter: new Adapter() })
