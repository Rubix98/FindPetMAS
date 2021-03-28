import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import styled from "styled-components";
const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoibWtsaW1lazE5OTciLCJhIjoiY2szd3Z4ZW9rMTA5ajNkb3B4cXd6ZW9wNSJ9.060xIr41HznBuJS_UYt1IA"
});
export const UserMap = styled(Map)`
  width: 300;
  height: 200;
  @media (max-width: 800px) {
    width: 100;
    height: 100;
  }
`;
