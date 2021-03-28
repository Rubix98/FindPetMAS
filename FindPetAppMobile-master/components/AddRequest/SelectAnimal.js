import React, {useEffect, useContext} from 'react';
import {View, Image, Text} from 'react-native';
import {NewAppInfo} from '../../context/AppInfo';
import {
  NewButton,
  Container,
  Link,
  StyledView,
  SelectAnimalText,
} from '../../styles/StartViewStyle';
import CustomHeader from '../CustomHeader/CustomHeader';
const SelectAnimal = props => {
  const userInfo = useContext(NewAppInfo);
  /* const userInfo = useContext(NewAppInfo);
  useEffect(() => {
    console.log(userInfo.picture);
  });
  */
  const setAnimal = async animal => {
    await userInfo.setAnimal(animal);
    await props.navigation.navigate('DataInfo');
  };
  return (
    <View>
      <CustomHeader navigation={props.navigation} />
      <Container>
        <SelectAnimalText>
          Wybierz rodzaj zwierzęcie jakie zauważyłeś :
        </SelectAnimalText>
        <StyledView>
          <NewButton
            text="Pies"
            onPress={() => {
              setAnimal('Pies');
            }}
          />
        </StyledView>
        <StyledView>
          <NewButton
            text="Kot"
            onPress={() => {
              setAnimal('Kot');
            }}
          />
        </StyledView>
        <StyledView>
          <NewButton
            text="Inne"
            onPress={() => {
              setAnimal('Inne');
            }}
          />
        </StyledView>
      </Container>
    </View>
  );
};
export default SelectAnimal;
