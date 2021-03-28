import React, {useState, useContext} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {NewAppInfo} from '../../context/AppInfo';
import axios from 'axios';
import {
  NotifyContainer,
  NotifyText,
  InputText,
  FormButton,
  FormButtonText,
} from '../../styles/UniqueCodeStyle';
const UniqueCodeLogin = props => {
  const userInfo = useContext(NewAppInfo);
  const [code, setCode] = useState('');
  const redirect = () => {
    props.navigation.navigate('Home');
  };
  const login = () => {
    axios.get(userInfo.apiip + '/uzytkownikkod/' + code).then(async res => {
      if (res.data.length === 1) {
        await userInfo.login(res.data[0]);
        await userInfo.initNotify(
          'Logowanie zakończone pomyślnie. Twoje nowe id to :' +
            res.data[0].idUżytkownik,
        );
        await setTimeout(redirect, 4000);
      } else {
        await userInfo.initNotify('Logowanie zakończone błędem !');
      }
    });
  };
  return (
    <View>
      {userInfo.notify !== '' && (
        <NotifyContainer>
          <NotifyText>{userInfo.notify}</NotifyText>
        </NotifyContainer>
      )}
      <InputText
        placeholder="Wprowadź unikalny kod:"
        onChangeText={text => {
          setCode(text);
        }}
      />
      <FormButton secureTextEntry="yes" onPress={() => login()}>
        <FormButtonText>Zaloguj się</FormButtonText>
      </FormButton>
    </View>
  );
};
export default UniqueCodeLogin;
