import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { LocationMarkerIcon } from "@heroicons/react/solid";
import getCenter from "geolib/es/getCenter";
import { SearchResultsData } from "../typings";

type Props = {
  searchResults: SearchResultsData[];
};

const Map = ({ searchResults }: Props) => {
  const [selectedLocation, setSelectedLocation] =
    useState<null | SearchResultsData>(null);

  const coordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  const center = getCenter(coordinates) as {
    longitude: number;
    latitude: number;
  };

  const [viewport, setViewport] = useState({
    longitude: center.longitude,
    latitude: center.latitude,
    zoom: 11,
  });

  console.log(selectedLocation);

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/alinta/cl9oe66g8001u14p0m8yblgkk"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
      onMove={(e) => setViewport(e.viewState)}
    >
      {searchResults.map((result) => (
        <div key={result.long}>
          <Marker
            latitude={result.lat}
            longitude={result.long}
            offset={[-20, -10]}
          >
            <p
              onClick={() => setSelectedLocation(result)}
              className="cursor-pointer animate-bounce
              text-[#FE595E]"
              aria-label="push-pin"
              role="img"
            >
              <LocationMarkerIcon className="h-6 w-6" />
            </p>
          </Marker>

          {selectedLocation?.long === result.long && (
            <Popup
              longitude={result.long}
              latitude={result.lat}
              onClose={() => setSelectedLocation(null)}
              closeOnClick={false}
            >
              {result.title}
            </Popup>
          )}
        </div>
      ))}
    </ReactMapGL>
  );
};

export default Map;
