import { Layer, Source } from "react-map-gl";

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

export default Polygon;