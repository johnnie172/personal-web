import { useEffect, useMemo, useRef } from "react";
import { Map as MapBox, Layer, Source, MapRef, LngLatLike } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MAPBOX_TOKEN, LOCATIONS_API } from "../../consts";
import { useAxiosFetch } from "../../hooks";
import { LinearProgress, Typography } from "@mui/material";

interface ILocationsData {
  center: LngLatLike;
  locations: number[][][] | []
}

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
  locations_data,
  mapRef,
}: {
  locations_data: ILocationsData;
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
    {locations_data.locations.map((coords, index) => (
      <Polygon key={index} locations={coords} id={index}></Polygon>
    ))}
  </MapBox>
);

const Map = () => {
  const { data, loading, error } = useAxiosFetch(LOCATIONS_API, null, true);
  const mapRef = useRef<MapRef | null>(null);
  const locations_data = useMemo<ILocationsData>(
    () => (Object.keys(data).length !== 0 ? data : {locations: [], center: [0,0]}),
    [data]
  );

  useEffect(() => {
    mapRef.current?.flyTo({
      center: locations_data.center,
      duration: 3000,
    });
    console.log(locations_data)
  }, [locations_data]);

  return loading ? (
    <LinearProgress />
  ) : error ? (
    <Typography
      variant="h4"
      align="center"
      color="error"
    >{`${error}`}</Typography>
  ) : locations_data ? (
    <Mapbox locations_data={locations_data} mapRef={mapRef}></Mapbox>
  ) : (
    <></>
  );
};
export default Map;
