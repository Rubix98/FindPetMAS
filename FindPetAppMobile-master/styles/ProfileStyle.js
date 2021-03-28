import styled from "styled-components"
import {Text} from 'react-native'
import React from 'react'
import MapboxGL from '@react-native-mapbox-gl/maps';
export const Container = styled.View`
    margin:0 0 1% 0; 
`
export const Header = styled.View`
    justifyContent: space-between;
    alignItems:center;
`
export const HeaderText = styled.Text`
    fontSize:20;
    fontWeight:bold;
`
const MyTouchableOpacity = styled.TouchableOpacity`
    backgroundColor: #66bb6a;
    padding: 10px;
`
export const EditProfileButton = props => {
    return(
    <MyTouchableOpacity onPress={props.onPress}>
    <Text style={{color:'white'}}>{props.text}</Text>
    </MyTouchableOpacity>
    )
};
export const UserActions = styled.TouchableOpacity`
    backgroundColor:#66bb6a;
    width:80%;
    alignItems:center;
    margin:1% auto 1% auto;
    padding:10px;
    fontSize:18px;
`
export const UserInfoText = styled.View`
    fontSize:15px;
    flexDirection:row;
    justifyContent:space-between;
`
export const InfoTextBold = styled.Text`
    fontWeight:bold;
`
export const SpoilerButton = styled.TouchableOpacity`
    backgroundColor: #66bb6a;
    padding: 20px;
    alignItems: center;
`
export const SpoilerText = styled.Text`
    fontSize:20px;
    color:white;

`
export const HeaderPostText = styled.Text`
    fontSize:18px;
    fontWeight:bold;
`
export const HeaderInfoText = styled.Text`
    fontSize:17px;
    fontWeight:bold;
`
export const InfoText = styled.View`
    fontSize:15px;
`
export const CommentContainer = styled.View`
    margin:0 0 20px 25px;
`
export const LocationImagesContainer = styled.View`
    flexDirection:column;
    alignItems:center;
    margin:1%;
`
export const Map = styled(MapboxGL.MapView)`
    height:200px;
    width:200px
`
export const Img = styled.Image`
    width:200px;
    margin:1%;
    height:200px;
`
export const PostsContainerInfo = styled.View`
    display:flex;
    justifyContent:space-between;
    flexDirection:row;
    width:100%;
    flexWrap:wrap;
`
export const PostInfo = styled.View`
    backgroundColor: #27ae60;
    width:40%;
    margin:1%;
    padding:1%;
    alignItems:center;
`
export const PostsContainer = styled.View`
    margin:0 0 40px 0;
`