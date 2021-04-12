export default route = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [
            props.post.Dlugosc_Geograficzna,
            props.post.Szerokosc_Geograficzna,
          ],
        },
      },
    ],
  };