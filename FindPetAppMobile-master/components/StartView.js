import React from 'react';
import {
  View,
  Button,
  Image,
  TouchableOpacity,
  Text,
  ImageBackground,
} from 'react-native';
import {NewButton, Container, Link, StyledView} from '../styles/StartViewStyle';
import CustomHeader from './CustomHeader/CustomHeader';
var img = require('../styles/pawprint.png');
import Background from '../images/panellogtlo.png';
const StartView = props => {
  console.log(props.navigation);
  //console.log(props.navigation.getParam('id', 0));
  return (
    <View>
      <CustomHeader navigation={props.navigation} />
      <ImageBackground
        source={Background}
        style={{width: '100%', height: '100%'}}>
        <Container>
          <StyledView>
            <NewButton
              text="Zauważyłem zwierzę"
              onPress={() => {
                props.navigation.navigate('Camera');
              }}
            />
          </StyledView>
        </Container>
      </ImageBackground>
    </View>
  );
};

export default StartView;
