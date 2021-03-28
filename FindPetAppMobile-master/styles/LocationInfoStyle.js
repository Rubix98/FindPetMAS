import styled from "styled-components"
import MapboxGL from '@react-native-mapbox-gl/maps';
export const Container = styled.View`
    flex: 1;
    alignItems: center;
    marginTop: 20px;
`
export const MapView = styled(MapboxGL.MapView)`
    width: 320;
    height: 500;
`
export const LocationName = styled.Text`
    width: 320;
    fontSize: 18;
`