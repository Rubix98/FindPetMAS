/* eslint-disable prettier/prettier */
import React from 'react';
import styled from 'styled-components';

const Container = styled.View`
  backgroundColor: #33d9b2;
  flexDirection: column;
  alignItems:center;
  backgroundColor:#33d9b2;
  width:90%;
  marginRight:1%;
`
const NotifyTextStyle = styled.Text`
    color:white;
    fontSize:16px;
`
export const NotifyText = props => {
  /*
    justifyContent: center;
    alignItems: center;
  */
  return (
      <Container text={props.text}>
      <NotifyTextStyle>{props.text}</NotifyTextStyle>
    </Container>
 
    
  );
};
