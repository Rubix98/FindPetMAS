/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, createContext} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
const AppInfo = createContext();
const apiIp = 'http://192.168.1.101:5100';

export const AppInfoProvider = props => {
  const {children} = props;
  const [user, setUser] = useState(null);
  const [notify, setNotify] = useState(null);
  const [request, setRequest] = useState({});
  const login = async val => {
    setUser(val);
    await AsyncStorage.setItem('appUserInfo', JSON.stringify(val));
  };
  const updateRequest = req => {
    setRequest(req);
  };
  const setPicture = (picture, id) => {
    let temp = request;
    if (temp.images === undefined) {
      temp.images = new Array(4);
    }
    temp.images[id] = picture;
    setRequest(temp);
  };
  const setAnimal = animal => {
    let temp = request;
    temp.animal = animal;
    setRequest(temp);
  };
  const initNotify = text => {
    setNotify(text);
    setTimeout(resetIndex, 4000);
  };
  const resetIndex = () => {
    setNotify('');
  };
  useEffect(() => {
    async function fetchData() {
      let tempArray = [];
      var isNew = false;
      let tempInfo = JSON.parse(await AsyncStorage.getItem('appUserInfo'));
      setUser(tempInfo);
      if ((await AsyncStorage.getItem('appUserInfo')) === null) {
        isNew = true;
        await axios
          .post(apiIp + '/uzytkownicy', {})
          .then(async response => {
            tempInfo = response.data[0];
            setUser(JSON.parse(JSON.stringify(response.data[0])));
            await AsyncStorage.setItem(
              'appUserInfo',
              JSON.stringify(response.data[0]),
            );
          })
          .catch(async error => {
            console.log('Błąd');
            console.log(error);
            await setUser(null);
          });
      } else {
        let tempUser = JSON.parse(await AsyncStorage.getItem('appUserInfo'))
          .idUzytkownik;
        console.log(apiIp + '/uzytkownicy/' + tempUser);
        await axios
          .get(apiIp + '/uzytkownicy/' + tempUser)
          .then(async response => {
            tempInfo = response.data[0];
            setUser(JSON.parse(JSON.stringify(response.data[0])));
            await AsyncStorage.setItem(
              'appUserInfo',
              JSON.stringify(response.data[0]),
            );
          });
      }

      if (isNew === false) {
        initNotify(
          'Pomyślnie zalogowano na użytkownika o id : ' + tempInfo.idUzytkownik,
        );
      } else {
        initNotify(
          'Od teraz jesteś zalogowany jako użytkownik o id : ' +
            tempInfo.idUżytkownik +
            ' Twój kod ' +
            tempInfo.unikalny_kod +
            ' będzie dostępny na twoim profilu',
        );
      }
    }
    fetchData();
  }, []);
  return (
    <AppInfo.Provider
      value={{
        user: user,
        initNotify: initNotify,
        notify: notify,
        apiip: apiIp,
        request: request,
        setRequest: updateRequest,
        setPicture: setPicture,
        setAnimal: setAnimal,
        login: login,
      }}>
      {children}
    </AppInfo.Provider>
  );
};
export const AppInfoConsumer = AppInfo.Consumer;
export const NewAppInfo = AppInfo;
