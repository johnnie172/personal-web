import { useEffect } from "react";
import { Map as MapBox, Layer, Source } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MAPBOX_TOKEN, LOCATIONS_API, USER_EMAIL } from "../../consts";
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

const Mapbox = ({ locations }: { locations: number[][][] }) => (
  <MapBox
    initialViewState={{
      longitude: 34.855499,
      latitude: 32.109333,
      //TODO: get center
      zoom: 10,
    }}
    style={{ width: "90vw", height: "70vh", margin: "auto" }}
    mapStyle="mapbox://styles/mapbox/streets-v9"
    mapboxAccessToken={MAPBOX_TOKEN}
  >
    {locations.map((coords, index) => (
      <Polygon key={index} locations={coords} id={index}></Polygon>
    ))}
  </MapBox>
);

const Map = () => {
  const { data, loading, error } = useAxiosFetch(LOCATIONS_API, null, true);

  const locations: number[][][] | [] =
    Object.keys(data).length !== 0 ? data : [];

  return loading ? (
    <LinearProgress />
  ) : error ? (
    <Typography
      variant="h4"
      align="center"
      color="error"
    >{`${error}`}</Typography>
  ) : locations ? (
    <Mapbox locations={locations}></Mapbox>
  ) : (
    <></>
  );
};
export default Map;
