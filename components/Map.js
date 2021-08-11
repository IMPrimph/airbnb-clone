import React, { useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import getCenter from 'geolib/es/getCenter'

function Map({ searchResults }) {

    const [selectedLocation, setSelectedLocation] = useState({})

    // transform searchResults object into 
    //  { latitude: 52.516272, longitude: 13.377722 }
    const coordinates = searchResults.map(result => ({
        longitude: result.long,
        latitude: result.lat
    }))

    const center = getCenter(coordinates)

    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11
    })

    return (
        <ReactMapGL
            {...viewport}
            mapStyle='mapbox://styles/primph/cks6ttna55ns018kc6ddoyty7'
            mapboxApiAccessToken={process.env.mapbox_key}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
            {searchResults.map(result => (
                <div key={result.long}>
                    <Marker
                        longitude={result.long}
                        latitude={result.lat}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <p
                            aria-label='push-pin'
                            role='img'
                            onClick={() => setSelectedLocation(result)}
                            className='cursor-pointer text-2xl animate-bounce'
                        >
                            📌
                        </p>
                    </Marker>

                    {/* the popup that should be shown on click */}
                    {selectedLocation.long === result.long ? (
                        <Popup
                            closeOnClick
                            onClose={() => setSelectedLocation({})}
                            latitude={result.lat}
                            longitude={result.long}
                        >
                            {result.title}
                        </Popup>
                    ) : (
                        false
                    )}
                </div>
            ))}
        </ReactMapGL>
    )
}

export default Map
