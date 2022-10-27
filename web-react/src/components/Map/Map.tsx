import { LinearProgress, Typography } from "@mui/material";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { LngLatLike, Map as MapBox, MapRef } from "react-map-gl";
import { LOCATIONS_API, MAPBOX_TOKEN } from "../../consts";
import { useAxiosFetch } from "../../hooks";
import { Polygon } from "./"

interface ILocationsData {
  center: LngLatLike;
  locations: number[][][] | [];
}

const MapboxWrapper = ({
  locations_data,
  mapRef,
  setMapLoading,
  children,
}: {
  locations_data: ILocationsData;
  mapRef: React.MutableRefObject<MapRef | null>;
  setMapLoading: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
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
    onLoad={() => setMapLoading(false)}
  >
    {children}
    {locations_data.locations.map((coords, index) => (
      <Polygon key={index} locations={coords} id={index}></Polygon>
    ))}
  </MapBox>
);

const Map = () => {
  const axiosParams = {
    api: LOCATIONS_API,
  };
  const { data, loading, error } = useAxiosFetch(axiosParams);
  const mapRef = useRef<MapRef | null>(null);
  const [mapLoading, setMapLoading] = useState(true);
  const locations_data = useMemo<ILocationsData>(
    () =>
      Object.keys(data).length !== 0 ? data : { locations: [], center: [0, 0] },
    [data]
  );

  useEffect(() => {
    mapRef.current?.flyTo({
      center: locations_data.center,
      duration: 3000,
    });
  }, [locations_data]);

  return !locations_data ? (
    <></>
  ) : (
    <MapboxWrapper
      locations_data={locations_data}
      mapRef={mapRef}
      setMapLoading={setMapLoading}
    >
      {loading || mapLoading ? (
        <LinearProgress sx={{ zIndex: 999, position: "inherit" }} />
      ) : error ? (
        <Typography
          variant="h4"
          align="center"
          color="error"
          sx={{ zIndex: 999, position: "inherit" }}
        >{`${error}`}</Typography>
      ) : (
        <></>
      )}
    </MapboxWrapper>
  );
};
export default Map;
