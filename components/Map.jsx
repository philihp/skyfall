import React, { useState } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import states from '../data/states'

const statesSet = new Set([
  'Kansas',
  'Missouri',
  'Colorado',
  'Florida',
  'North Carolina',
  'Georgia',
])

const nameToCodes = {
  Kansas: 'KS',
  Missouri: 'MO',
  Colorado: 'CO',
  Florida: 'FL',
  'North Carolina': 'NC',
  Georgia: 'GA',
}

// MapChart supports temporary filters on hover, but reverts to the previous configuration onMouseLeave.
// Clicking a state persists the new filter configuration.
const MapChart = ({ filterOptions, setFilterOptions }) => {
  const [hoveredState, setHoveredState] = useState(-1)
  const statesData = states()

  const handleClick = (name) => {
    const code = nameToCodes[name]

    setFilterOptions({
      ...filterOptions,
      state: code,
    })
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
                    fill="#6f44ff"
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
