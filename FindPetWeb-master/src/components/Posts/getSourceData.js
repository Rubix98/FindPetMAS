export default getSourceData = (obj) => {
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
            coordinates: [obj.longitude, obj.latitude],
          },
        },
      ],
    },
  };
};
