import React, { useState } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import states from '../data/states'

const statesSet = new Set([
  'Colorado',
  'Florida',
  'Iowa',
  'Indiana',
  'Kansas',
  'Michigan',
  'Nevada',
  'Pennsylvania',
  'Texas',
  'Wisconsin',
])

const nameToCodes = {
  Colorado: 'CO',
  Florida: 'FL',
  Iowa: 'IA',
  Indiana: 'IN',
  Kansas: 'KS',
  Michigan: 'MI',
  Nevada: 'NV',
  Pennsylvania: 'PA',
  Texas: 'TX',
  Wisconsin: 'WI',
}

// MapChart supports temporary filters on hover, but reverts to the previous configuration onMouseLeave.
// Clicking a state persists the new filter configuration.
const MapChart = ({ filterOptions, setFilterOptions, setSelectedIdx }) => {
  const [hoveredState, setHoveredState] = useState(-1)
  const statesData = states()

  const handleClick = (name) => {
    const code = nameToCodes[name]

    setFilterOptions({
      ...filterOptions,
      state: code,
    })
    setSelectedIdx(-1)
  }

  const getOpacity = (name) => {
    if (
      statesSet.has(name) &&
      (name === hoveredState || nameToCodes[name] === filterOptions.state)
    ) {
      return 1
    }
    if (statesSet.has(name)) {
      return 0.5
    }
    return 0.15
  }

  return (
    <div style={{ width: 400 }}>
      <ComposableMap projection="geoAlbersUsa">
        <Geographies geography={statesData}>
          {({ geographies }) => (
            <>
              {geographies.map((geo) => (
                <g cursor={statesSet.has(geo.properties.name) ? 'pointer' : ''}>
                  <Geography
                    key={geo.rsmKey}
                    stroke="#FFF"
                    geography={geo}
                    fill="#00B36B"
                    opacity={getOpacity(geo.properties.name)}
                    onClick={() => {
                      if (statesSet.has(geo.properties.name)) {
                        handleClick(geo.properties.name)
                      }
                    }}
                    onMouseOver={() => {
                      if (statesSet.has(geo.properties.name)) {
                        setHoveredState(geo.properties.name)
                      }
                    }}
                    onMouseLeave={() => {
                      if (statesSet.has(geo.properties.name)) {
                        setHoveredState(-1)
                      }
                    }}
                  />
                </g>
              ))}
            </>
          )}
        </Geographies>
      </ComposableMap>
    </div>
  )
}

export default MapChart
