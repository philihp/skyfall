import React, { useEffect } from 'react'
import Router from 'next/router'
import * as gtag from '../lib/gtag'
import '../styles/globals.css'
import '../setup/setTheme'

// eslint-disable-next-line react/prop-types
const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    Router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...pageProps} />
}

export default MyApp
