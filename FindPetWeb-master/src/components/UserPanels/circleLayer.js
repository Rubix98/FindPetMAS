export default circleLayer = {
  id: "circle-outline",
  type: "line",
  source: {
    type: "geojson",
    data: circle,
  },
  paint: {
    "line-color": "#1B5E20",
    "line-opacity": 0.5,
    "line-width": 1,
    "line-offset": 5,
  },
  layout: {},
};
