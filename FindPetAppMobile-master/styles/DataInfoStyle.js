import React from 'react';
import styled from 'styled-components';
export const MyTextInput = styled.TextInput`
    padding:10px;
    backgroundColor:#33691E;
    color:white;
    margin:1px;
    textAlignVertical:top;
    fontSize:20;
`
export const MyPicker = styled.View`
    backgroundColor:#33691E;
    borderBottomWidth: 1;
    borderColor: black;
`
export const MyText = styled.Text`
    fontSize:20;    
    color:white;
`
export const MyTouchableOpacity = styled.TouchableOpacity`
    fontSize:20;    
    padding:10px;
    backgroundColor:#33691E;
    alignItems:center;
`
export const LabelText = styled.Text`
    fontSize:15;
`
export const Container = styled.View`
    marginTop: 1;
    padding: 1px;
    flex: 1;
`
export const PicturesContainer = styled.View`
    flexDirection: row;
    justifyContent: space-evenly;
    flexWrap: wrap;
`
export const AnimalPhoto = styled.Image`
    width: 160px;
    height: 160px;
`