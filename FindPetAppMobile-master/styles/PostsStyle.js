import styled from 'styled-components'
import MapboxGL from '@react-native-mapbox-gl/maps'
import Icon from 'react-native-ionicons';
export const PostContainer = styled.View`
    marginBottom:80;
`
export const HeaderText = styled.Text`
    fontSize: 18;
    fontWeight: bold;
    textAlign: center;
`
export const Item = styled.Text`
    flexDirection:row;
    fontSize:15;
`
export const ItemAtribute = styled.Text`
    fontWeight:bold;
`
export const UserLink = styled.Text`
    textDecorationLine:underline;
`
export const InformationList = styled.View`
    flexDirection:row;
    display:flex;
    margin:8% 0 8% 0;
    alignItems:center
    justifyContent:center;
    width:100%;
    flexWrap:wrap;
`
export const InformationAtribute = styled.Text`
    fontSize: 15;
    fontWeight: bold;
`
export const InformationValue = styled.Text`
    fontSize: 15;
    textAlign: center;
    borderRadius: 80;
`
export const InformationComment = styled.Text`
    fontSize:15;
`
export const SectionContainer = styled.View`
    alignItems:center;
`
export const MapViewer = styled(MapboxGL.MapView)`
    width:80%;
    height:200;
`
export const ImagesContainer = styled.View`
    flexDirection: row;
    alignItems: center;
    justifyContent: space-evenly;
    flexWrap: wrap;
`
export const Img = styled.Image`
    width:150;
    height:150;
    margin:10px;
`
export const CommentContainer = styled.View`
    backgroundColor: #F3FFFD;
    marginTop:30;
    marginLeft:30;
`
export const LocationCommentContainer = styled.View`
    marginLeft:10;
    alignItems:center;
`
export const AddCommentButton = styled.TouchableOpacity`
    width: 300;
    height: 80;
    marginTop: 20;
    backgroundColor: #55efc4;
    justifyContent: center;
`
export const TextButton = styled.Text`
    fontSize:17;
    textAlign:center;
    justifyContent:center;
`
export const MainContainer = styled.View`
    padding:5px;
`
export const ActionContainer = styled.View`
    flexDirection: row;
    justifyContent: space-between;
`
export const ActionButton = styled.TouchableOpacity`
    padding: 2px;    
    backgroundColor: #66F9A3;
    justifyContent: center;
    alignItems: center;
    borderWidth: 1;
`
export const ActionButtonText = styled.Text`
    fontSize:25;
    color:black;
    justifyContent:center;
`
export const ActionButtonClicked = styled.TouchableOpacity`
    padding: 2px;    
    backgroundColor: #66F9A3;
    justifyContent: center;
    alignItems: center;
    borderWidth: 1;
`
export const ActionButtonClickedText = styled.Text`
    fontSize: 25;
    color: white;
    justifyContent: center;
`
export const InputText = styled.TextInput`
    fontSize: 20;
    borderBottomColor: black;
    borderBottomWidth: 2;
    marginBottom: 30;
`
export const InputLabel = styled.Text`
    fontSize:20;
`
export const PickerContainer = styled.View`
    borderBottomWidth:1;
    borderColor:black;
`
export const Select = styled.Picker`
    height:50;
` 
export const TimeButton = styled.TouchableOpacity`
    alignItems:center;
    backgroundColor: #66F9A3;
    padding:1px;
`
export const SortContainer = styled.View`
    marginTop:10;
    flexDirection:row;
    alignItems:center;
    justifyContent:space-evenly;
    flexWrap:wrap;
`
export const SortButton = styled.TouchableOpacity`
    marginTop: 10;
    minWidth: 100;
    height: 50;
    justifyContent: center;
    alignItems: center;
    borderRadius: 100;
    borderWidth: 1;
`
export const SortButtonClicked = styled.TouchableOpacity`
    marginTop: 10;
    minWidth: 100;
    height: 50;
    justifyContent: center;
    alignItems: center;
    borderRadius: 100;
    borderWidth: 1;
    backgroundColor: #bef67a;
    flexDirection: row;
`
export const SortIcon = styled(Icon)`
    color:black;
`
export const UserActions = styled.TouchableOpacity`
backgroundColor:#66bb6a;
width:80%;
alignItems:center;
margin:1% auto 1% auto;
padding:10px;
fontSize:18px;
`
export const FiltrButton = styled.TouchableOpacity`
    padding:1%;
    margin:1% auto 1% auto;
    backgroundColor:#66F9A3
`
export const FiltrMapViewer = styled(MapboxGL.MapView)`
    width:100%;
    height:220;
`