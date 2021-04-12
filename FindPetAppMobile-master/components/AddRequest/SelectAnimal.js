import React from 'react';
import {View} from 'react-native';
import {
  Container,
  StyledView,
  SelectAnimalText,
} from '../../styles/StartViewStyle';
import CustomHeader from '../CustomHeader/CustomHeader';
import MyNewButton from "./MyNewButton"
const SelectAnimal = props => {
  return (
    <View>
      <CustomHeader navigation={props.navigation} />
      <Container>
        <SelectAnimalText>
          Wybierz rodzaj zwierzęcie jakie zauważyłeś :
        </SelectAnimalText>
        <StyledView>
          <MyNewButton
            name="Pies"
          />
        </StyledView>
        <StyledView>
          <MyNewButton
            name="Kot"
          />
        </StyledView>
        <StyledView>
          <MyNewButton name="Inne"
          />
        </StyledView>
      </Container>
    </View>
  );
};
export default SelectAnimal;
