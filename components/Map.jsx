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
  const [previousFilterOptions, setPreviousFilterOptions] = useState({})
  const statesData = states()

  const handleHover = (name) => {
    const code = nameToCodes[name]

    setFilterOptions({
      ...filterOptions,
      state: code,
    })
  }

  const handleClick = (name) => {
    const code = nameToCodes[name]

    setPreviousFilterOptions({
      ...filterOptions,
      state: code,
    })
  }

  return (
    <div
      style={{ width: 400 }}
      onMouseEnter={() => {
        setPreviousFilterOptions(filterOptions)
      }}
      onMouseLeave={() => {
        setFilterOptions(previousFilterOptions)
      }}
    >
      <ComposableMap projection="geoAlbersUsa">
        <Geographies geography={statesData}>
          {({ geographies }) => (
            <>
              {geographies.map((geo) => (
                <g cursor={statesSet.has(geo.properties.name) ? 'pointer' : ''}>
                  <Geography
                    style={{
                      cursor: 'pointer',
                      fill: 'red',
                      border: '1px solid black',
                    }}
                    key={geo.rsmKey}
                    stroke="#FFF"
                    geography={geo}
                    fill="#6f44ff"
                    opacity={statesSet.has(geo.properties.name) ? 1 : 0.15}
                    onClick={() => {
                      if (statesSet.has(geo.properties.name)) {
                        handleClick(geo.properties.name)
                      }
                    }}
                    onMouseOver={() => {
                      if (statesSet.has(geo.properties.name)) {
                        handleHover(geo.properties.name)
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
