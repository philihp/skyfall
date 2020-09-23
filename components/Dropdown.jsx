import React, { useCallback, useEffect, useRef, useState } from 'react'
import useStyles from '@airbnb/lunar/lib/hooks/useStyles'

import Button from '@airbnb/lunar/lib/components/Button'

// Modified from Lunar.
export const styleSheet = ({ color, ui, pattern, unit }) => ({
  container: {
    display: 'inline-block',
    zIndex: 10,
    position: 'relative',
  },
  menu: {
    ...pattern.box,
    margin: 0,
    marginTop: unit,
    padding: `${unit}px 0`,
    backgroundColor: color.accent.bg,
    listStyle: 'none',
    position: 'absolute',
    maxWidth: 500,

    '@selectors': {
      '> li': {
        position: 'relative',
      },

      // These are jank. Better way?
      '> li:first-child > *': {
        borderTopLeftRadius: ui.borderRadius,
        borderTopRightRadius: ui.borderRadius,
      },

      '> li:last-child > *': {
        borderBottomLeftRadius: ui.borderRadius,
        borderBottomRightRadius: ui.borderRadius,
      },
    },
  },
})

/** A controller for multiple tabs. */
export default function MenuToggle({ label, accessibilityLabel, children }) {
  const [opened, setOpened] = useState(false)
  const [styles, cx] = useStyles(styleSheet)

  const ref = useRef(null)

  const handleClickOutside = useCallback((e) => {
    const { current } = ref
    if (!current?.contains(e.target)) {
      setOpened(false)
    }
  }, [])

  useEffect(() => {
    if (opened) {
      window.addEventListener('click', handleClickOutside, true)
    } else {
      window.removeEventListener('click', handleClickOutside, true)
    }

    return () => {
      window.removeEventListener('click', handleClickOutside, true)
    }
  }, [opened, handleClickOutside])

  return (
    <div
      ref={ref}
      className={cx(styles.container)}
      aria-label={accessibilityLabel}
    >
      <Button inverted small onClick={() => setOpened(!opened)}>
        {label}
      </Button>
      {opened && (
        <div className={cx(styles.menu)}>
          <div
            role="button"
            tabIndex={0}
            onKeyPress={() => setOpened(false)}
            onClick={() => setOpened(false)}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  )
}
