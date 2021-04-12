export default getDataSource = (obj) => {
  return {
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
  };
};
