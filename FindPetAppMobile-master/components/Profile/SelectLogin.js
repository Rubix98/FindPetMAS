import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  LabelText,
  Container,
  ChoiceButton,
  ButtonText,
} from '../../styles/SelectLoginStyle';
const SelectLogin = props => {
  return (
    <View>
      <LabelText>Wybierz rodzaj logowania :</LabelText>
      <Container>
        <ChoiceButton
          onPress={() => {
            props.navigation.navigate('UniqueCodeLogin');
          }}>
          <ButtonText>Za pomocą unikalnego kodu</ButtonText>
        </ChoiceButton>
        <ChoiceButton
          onPress={() => {
            props.navigation.navigate('RegularLogin');
          }}>
          <ButtonText>Za pomocą loginu i hasła</ButtonText>
        </ChoiceButton>
      </Container>
    </View>
  );
};
export default SelectLogin;
