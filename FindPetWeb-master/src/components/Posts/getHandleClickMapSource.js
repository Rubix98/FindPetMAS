export default getHandleClickMapSource = (lng, lat) => {
  return {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [lng, lat],
        },
      },
    ],
  };
};
