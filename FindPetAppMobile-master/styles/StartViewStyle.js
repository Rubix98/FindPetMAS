/* eslint-disable prettier/prettier */
import React from 'react';
import {View,TouchableOpacity} from 'react-native'
import styled from 'styled-components';

const StartButton = styled.TouchableOpacity`
  /*prettier-ignore */
    backgroundColor: #27ae60;
    borderRadius: 4;
    borderWidth: 0.5;
    borderColor: black;
    width:300px;
    height:50px;
    justifyContent: center;
    alignItems: center;
`;
export const StyledView = styled.View`
    marginTop:1px;
`
const TextButton = styled.Text`
    font-size: 24px;
    justifyContent: center;
    alignItems: center;
    color:white;
`;
export const Link = styled.Text`

    width:300px;
    height:auto;
    alignItems:center;
    justifyContent:center;
    textDecorationLine:underline;
    font-size:18px;
`
export const Container = styled.View`

  flexDirection: column;
  alignItems:center;
  justifyContent:center;
  height:100%;
  /*backgroundColor: #3e9465;*/
`;
export const SelectAnimalText = styled.Text`
  fontSize:18;
  color:black;
`
const MyButtonStartView = props => {
  let MyButton;
  if (props.onPress !== undefined) {
    MyButton = (
      <StartButton onPress={props.onPress}>
        <TextButton>{props.text}</TextButton>
      </StartButton>
    );
  } else {
    MyButton = (
      <StartButton>
        <TextButton>{props.text}</TextButton>
      </StartButton>
    );
  }
  return <View>{MyButton}</View>;
};
export const NewButton = styled(MyButtonStartView)`
  width:300px;
  height:300px;
`
