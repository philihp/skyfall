import React from 'react'
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

const MapChart = ({ filterOptions, setFilterOptions }) => {
  const statesData = states()

  const handleClick = (name) => {
    const code = nameToCodes[name]
    setFilterOptions({
      ...filterOptions,
      state: code,
    })
  }

  return (
    <div style={{ width: 400 }}>
      <ComposableMap projection="geoAlbersUsa">
        <Geographies geography={statesData}>
          {({ geographies }) => (
            <>
              {geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  stroke="#FFF"
                  geography={geo}
                  fill="#6f44ff"
                  opacity={statesSet.has(geo.properties.name) ? 1 : 0.15}
                  onMouseOver={() => {
                    if (statesSet.has(geo.properties.name)) {
                      handleClick(geo.properties.name)
                    }
                  }}
                />
              ))}
            </>
          )}
        </Geographies>
      </ComposableMap>
    </div>
  )
}

export default MapChart
