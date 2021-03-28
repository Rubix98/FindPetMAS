/* eslint-disable react/jsx-no-undef */
import React, {useContext, useState, Fragment} from 'react';
import {NewAppInfo} from '../../context/AppInfo';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import * as yup from 'yup';
import {Formik} from 'formik';
import axios from 'axios';
import md5 from 'md5';
import CustomHeader from '../CustomHeader/CustomHeader';
import {
  MainContainer,
  NotifyContainer,
  NotifyText,
  InputText,
  FormError,
  SendButton,
  SendButtonText,
} from '../../styles/EditProfileStyle';
const EditProfile = props => {
  console.log(props);
  const userInfo = useContext(NewAppInfo);
  const [mail, setMail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');
  console.log(userInfo);
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const redirect = () => {
    props.navigation.navigate('Home');
  };

  const sendRequest = val => {
    let type;
    let pass;
    if (val.login && val.password) {
      type = 'Z';
    } else {
      type = 'B';
    }
    if (val.password !== '' && val.password !== undefined) {
      pass = md5(val.password);
    } else {
      pass = '';
    }
    axios
      .put(userInfo.apiip + '/uzytkownicy', {
        idUżytkownik: userInfo.user.idUżytkownik,
        adres_mail: val.email || '',
        login: val.login || '',
        haslo: pass,
        nr_telefonu: val.phone || '',
        typ: type,
        unikalny_kod: userInfo.user.unikalny_kod,
      })
      .then(res => {
        console.log(res);
        if (res.data.status === 'success') {
          userInfo.initNotify('Dane zostały zmienione pomyślnie');
          setTimeout(redirect, 4000);
        } else {
          userInfo.initNotify('Wystąpił błąd podczas edycji profilu');
        }
      })
      .catch(err => {
        userInfo.initNotify('Wystąpił błąd podczas edycji profilu');
      });
  };
  console.log(userInfo);
  return (
    <MainContainer>
      {userInfo.notify !== '' && (
        <NotifyContainer>
          <NotifyText>{userInfo.notify}</NotifyText>
        </NotifyContainer>
      )}
      <Formik
        initialValues={{
          email: userInfo.user.adres_mail || '',
          password: '',
          login: userInfo.user.login || '',
          phone: userInfo.user.nr_telefonu || '',
        }}
        onSubmit={values => sendRequest(values)}
        validationSchema={yup.object().shape({
          email: yup.string().email(),
          login: yup.string().min(6),
          password: yup.string().min(6),
          phone: yup
            .string()
            .min(9)
            .matches(phoneRegExp),
        })}>
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          isValid,
          handleSubmit,
        }) => (
          <Fragment>
            <InputText
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={() => setFieldTouched('email')}
              placeholder="E-mail"
              keyboardType="email-address"
            />
            {touched.email && errors.email && (
              <FormError>Niepoprawny adres e-mail</FormError>
            )}
            <InputText
              value={values.login}
              onChangeText={handleChange('login')}
              placeholder="Login"
              onBlur={() => setFieldTouched('login')}
            />
            {touched.login && errors.login && (
              <FormError>
                Login musi składać się z przynajmniej 6 liter
              </FormError>
            )}
            <InputText
              value={values.password}
              onChangeText={handleChange('password')}
              placeholder="Hasło"
              onBlur={() => setFieldTouched('password')}
              secureTextEntry={true}
            />
            {touched.password && errors.password && (
              <FormError>
                Hasło musi składać się z przynajmniej 6 liter
              </FormError>
            )}
            <InputText
              value={values.phone}
              onChangeText={handleChange('phone')}
              placeholder="Numer telefonu:"
              onBlur={() => setFieldTouched('phone')}
              keyboardType="numeric"
            />
            {touched.phone && errors.phone && (
              <FormError>
                Numer telefonu musi składać się przynajmniej z 9 cyfr.
              </FormError>
            )}
            <SendButton disabled={!isValid} onPress={handleSubmit}>
              <SendButtonText>Zmień dane.</SendButtonText>
            </SendButton>
          </Fragment>
        )}
      </Formik>
    </MainContainer>
  );
};
export default EditProfile;
