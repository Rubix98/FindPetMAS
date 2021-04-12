import MapboxDraw from "@mapbox/mapbox-gl-draw";
export default getDrawOptions = () => {
  return new MapboxDraw({
    defaultMode: "draw_circle",
    userProperties: true,
    initialRadiusInKm: 0.1,
    modes: {
      ...MapboxDraw.modes,
      draw_circle: CircleMode,
      drag_circle: DragCircleMode,
      direct_select: DirectMode,
      simple_select: SimpleSelectMode,
    },
  });
};
