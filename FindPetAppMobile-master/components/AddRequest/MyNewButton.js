import React, {
    useContext
} from 'react';
import {
    NewButton
  } from '../../styles/StartViewStyle';
import {NewAppInfo} from '../../context/AppInfo';
const MyNewButton = props => {
    const userInfo = useContext(NewAppInfo);
    const setAnimal = async animal => {
        await userInfo.setAnimal(animal);
        await props.navigation.navigate('DataInfo');
      };
    return (
        <NewButton text={props.name}
        onPress={
            () => {
                setAnimal(props.name);
            }
        }
    />)
}
export default MyNewButton