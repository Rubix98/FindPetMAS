export default getSource = (obj) => {
  return {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [obj.longitude, obj.latitude],
          },
        },
      ],
    },
  };
};
