import styled from 'styled-components'
import MapboxGL from '@react-native-mapbox-gl/maps';
export const NotifyContainer = styled.View`
    borderBottomWidth: 2;
    flexDirection: row;
    alignItems: center;
    justifyContent: center;
    paddingTop: 5;
    backgroundColor: #66F9A3;
`
export const NotifyTextContainer = styled.Text`
    color:white;
`
export const ItemAtribute = styled.Text`
    fontSize:17;
`
export const InputText = styled.TextInput`
    textAlignVertical:top;
    borderBottomWidth:1.0;
    fontSize:17;
`
export const FormButton = styled.TouchableOpacity`
    padding:10px;
    backgroundColor: #66F9A3;
    `
export const FormText = styled.Text`
    fontSize:18;
    textAlign:center;
`
export const PhotosContainer = styled.View`
    flexDirection: row;
    justifyContent: space-evenly;
    flexWrap: wrap;
`
export const Img = styled.Image`
    width:150;
    height:150;
`
export const MapViewer = styled(MapboxGL.MapView)`
    width:300;
    height:300;
`
export const MapView = styled.View`
    margin:1% auto 1% auto;
`