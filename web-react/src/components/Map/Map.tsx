import { useEffect, useMemo, useRef } from "react";
import { Map as MapBox, Layer, Source, MapRef } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MAPBOX_TOKEN, LOCATIONS_API } from "../../consts";
import { useAxiosFetch } from "../../hooks";
import { LinearProgress, Typography } from "@mui/material";

const Polygon = ({ locations, id }: { locations: number[][]; id: number }) => (
  <Source
    type="geojson"
    data={{
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "MultiPolygon",
            coordinates: [[locations]],
          },
        },
      ],
    }}
  >
    <Layer
      {...{
        id: `${id}`,
        type: "fill",
        paint: {
          "fill-color": "#7CFC00",
          "fill-opacity": 0.5,
        },
      }}
    />
  </Source>
);

const Mapbox = ({
  locations,
  mapRef,
}: {
  locations: number[][][];
  mapRef: React.MutableRefObject<MapRef | null>;
}) => (
  <MapBox
    initialViewState={{
      longitude: 0,
      latitude: 0,
      zoom: 10,
    }}
    style={{ width: "90vw", height: "70vh", margin: "auto" }}
    mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
    mapboxAccessToken={MAPBOX_TOKEN}
    ref={mapRef}
  >
    {locations.map((coords, index) => (
      <Polygon key={index} locations={coords} id={index}></Polygon>
    ))}
  </MapBox>
);

const Map = () => {
  const { data, loading, error } = useAxiosFetch(LOCATIONS_API, null, true);
  const mapRef = useRef<MapRef | null>(null);
  const locations = useMemo<number[][][] | []>(
    () => (Object.keys(data).length !== 0 ? data : []),
    [data]
  );

  useEffect(() => {
    mapRef.current?.flyTo({
      //TODO: get center
      center: [locations[0][0][0], locations[0][0][1]],
      duration: 3000,
    });
  }, [locations]);

  return loading ? (
    <LinearProgress />
  ) : error ? (
    <Typography
      variant="h4"
      align="center"
      color="error"
    >{`${error}`}</Typography>
  ) : locations ? (
    <Mapbox locations={locations} mapRef={mapRef}></Mapbox>
  ) : (
    <></>
  );
};
export default Map;
