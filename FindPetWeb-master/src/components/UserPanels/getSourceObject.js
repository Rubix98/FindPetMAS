export default getSourceObject = (lng, lat) => {
  return {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            //53.015331, 18.6057
            coordinates: [lng, lat],
          },
        },
      ],
    },
  };
};
