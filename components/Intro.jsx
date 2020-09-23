import React from 'react'

import useStyles from '@airbnb/lunar/lib/hooks/useStyles'
import Link from '@airbnb/lunar/lib/components/Link'

const styleSheet = () => ({
  bodyText: {
    maxWidth: 800,
    margin: 'auto',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: '24px 0',
  },
})

const Intro = () => {
  const [styles, cx] = useStyles(styleSheet)
  return (
    <>
      <div className={cx(styles.bodyText)}>
        <div className={cx(styles.titleText)}>
          Dems, donate where it can make a difference
        </div>
        At Data 2 the People we have been working on 2020 elections up and down
        the ballot, and in the course of our work we have collected data on many
        different races.
        <br />
        <br />
        We want to help people sort through the data to find the races that need
        the money most. We’re excited to share our work: aggregated election
        data from across states and races to find candidates we believe are most
        in need of funds. <br />
        <br />
        To start, we’ve focused on historical election outcome data and current
        fundraising data for the 2020 cycle. We’ve identified 86 priority state
        legislature races, which you can explore here on this page.
        <br />
        <br />
        Our goal is to be transparent about our process so that we all can make
        clearer decisions and so that Democrats can win big in November, up and
        down the ballot! We will update this analysis as we collect additional
        data and welcome your comments and ideas! For details on our
        methodology, see our{' '}
        <Link href="https://www.data2thepeople.org/">
          accompanying blog post
        </Link>
        .
      </div>
    </>
  )
}

export default Intro