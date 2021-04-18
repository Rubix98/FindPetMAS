export default getCircle = (obj) => {
  return {
    id: "circle-fill",
    type: "fill",
    source: {
      type: "geojson",
      data: obj,
    },
    paint: {
      "fill-color": "#33691E",
      "fill-opacity": 0.5,
    },
  };
};
