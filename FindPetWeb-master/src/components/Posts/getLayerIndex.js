export default getLayerIndex = (obj) => {
  return {
    id: `${obj}points`,
    type: "symbol",
    source: `${obj}point`,
    layout: {
      "icon-image": "cat",
      "icon-size": 0.05,
    },
  };
};
