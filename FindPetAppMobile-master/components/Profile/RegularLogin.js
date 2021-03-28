import React, {useState, useContext} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {NewAppInfo} from '../../context/AppInfo';
import axios from 'axios';
import md5 from 'md5';
import {
  NotifyContainer,
  NotifyText,
  InputText,
  FormButton,
  TextButton,
} from '../../styles/RegularLoginStyle';
const RegularLogin = props => {
  const userInfo = useContext(NewAppInfo);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const redirect = () => {
    props.navigation.navigate('Home');
  };
  const loginRequest = () => {
    if (login !== '' && password !== '') {
      console.log(login + ',' + md5(password));
      axios
        .post(userInfo.apiip + '/logowanie/', {
          login: login,
          haslo: md5(password),
        })
        .then(async res => {
          console.log(res);
          if (res.data.status === 'success') {
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
    } else {
      userInfo.initNotify('Wprowadzone dane wyglądają na niepoprawne.');
    }
  };
  return (
    <View>
      {userInfo.notify !== '' && (
        <NotifyContainer>
          <NotifyText>{userInfo.notify}</NotifyText>
        </NotifyContainer>
      )}
      <InputText
        placeholder="Wprowadź login:"
        onChangeText={text => {
          setLogin(text);
        }}
      />
      <InputText
        secureTextEntry={true}
        placeholder="Wprowadź hasło:"
        onChangeText={text => {
          setPassword(text);
        }}
      />
      <FormButton onPress={() => loginRequest()}>
        <TextButton>Zaloguj się</TextButton>
      </FormButton>
    </View>
  );
};
export default RegularLogin;
