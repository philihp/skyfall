import React from 'react'
import useStyles from '@airbnb/lunar/lib/hooks/useStyles'

import Spacing from '@airbnb/lunar/lib/components/Spacing'
import Title from '@airbnb/lunar/lib/components/Title'
import Link from '@airbnb/lunar/lib/components/Link'

const styleSheet = () => ({
  header: {
    maxWidth: 800,
    display: 'flex',
    justifyContent: 'space-between',
    margin: 'auto',
  },
  logo: {
    height: 48,
  },
  row: {
    display: 'flex',
    alignItems: 'center',
  },
})

export default function Header() {
  const [styles, cx] = useStyles(styleSheet)

  return (
    <Spacing top={1.5}>
      <div className={cx(styles.header)}>
        <div className={cx(styles.row)}>
          <Spacing inline left={2}>
            <img src="/logo-large.png" className={cx(styles.logo)} alt="logo" />
          </Spacing>
          <Title level={3}>Data 2 the People</Title>
        </div>
        <div className={cx(styles.row)}>
          <Spacing right={2}>
            <Link bold href="https://www.data2thepeople.org/about-us">
              About
            </Link>
          </Spacing>
          <Spacing right={2}>
            <Link bold href="https://www.data2thepeople.org/donate">
              Donate
            </Link>
          </Spacing>
          <Spacing right={2.5}>
            <Link bold href="https://www.data2thepeople.org/">
              Home
            </Link>
          </Spacing>
        </div>
      </div>
    </Spacing>
  )
}
