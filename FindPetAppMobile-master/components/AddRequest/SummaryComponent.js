import React, {useContext} from 'react';
import {NewAppInfo} from '../../context/AppInfo';
import moment from 'moment';
import {
  MyText,
  MyTouchableOpacity,
} from '../../styles/DataInfoStyle';
import {
  Container,
  AnimalImage,
  ImagesContainer,
  HeaderText,
  UserChoice,
  Item,
  NotifyContainer,
  NotifyText,
} from '../../styles/SummaryComponentStyle';
const Images = () => {
  const userInfo = useContext(NewAppInfo);
  let temp = userInfo.request.images.map((img, index) => {
    if (img.uri != undefined) {
      return <AnimalImage source={{...img}} key={index} />;
    }
  });
  return <ImagesContainer>{temp}</ImagesContainer>;
};

const SummaryComponent = props => {
  const userInfo = useContext(NewAppInfo);
  let context = userInfo.request;
  let animal = context.animal || '(Nie podano)';
  let content = context.content || '(Nie podano)';
  let size = context.size;
  let hairColour = context.hairColour || '(Nie podano)';
  let specialInfo = context.specialInfo || '(Nie podano)';
  let notice_date = context.notice_date;
  let took = context.took === false ? 'nie' : 'tak';
  let breed = context.breed || '(Nie podano)';
  let imagesArray = [];
  let noImages = 0;
  context.images.map((img, index) => {
    if (img.fileSize != undefined) {
      noImages++;
      imagesArray.push({...img});
    }
  });
  const sendRequest = async () => {
    const redirect = () => {
      props.navigation.navigate('Home');
    };
    const data = new FormData();
    data.append('idUżytkownik', userInfo.user.idUżytkownik);
    data.append('tresc', context.content || '');
    data.append('komentarz', '');
    data.append('typ_zgloszenia', context.took === false ? 1 : 2);
    data.append('typ_zwierzecia', context.animal);
    data.append('rasa', context.breed || '');
    data.append('wielkosc', context.size || '');
    data.append('kolor_siersci', context.hairColour || '');
    data.append('nagroda', '');
    data.append(
      'data_zgloszenia',
      moment(new Date()).format('YYYY-MM-D HH:mm:ss'),
    );
    data.append(
      'data_time',
      moment(notice_date).format('YYYY-MM-D HH:mm:ss'),
    );
    data.append('Szerokosc_Geograficzna', userInfo.request.location[1]);
    data.append('Dlugosc_Geograficzna', userInfo.request.location[0]);
    data.append('obszar', '');
    data.append('ilosc_zdjec', noImages);
    data.append('znaki_szczegolne', context.specialInfo);
    for (var i = 0; i < imagesArray.length; i++) {
      if (imagesArray[i].fileSize) {
        data.append('zdjecia', {
          uri: imagesArray[0].uri,
          type: imagesArray[0].type,
          name: imagesArray[0].fileName,
        });
      }
    }
    const config = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: data,
    };
    userInfo.initNotify('Zgłoszenie w trakcie wysyłania.');
    fetch(userInfo.apiip + '/posty', config)
      .then(res => {
        res.text().then(text => {
          let json = JSON.parse(text);
          if (json.status === 'success') {
            userInfo.initNotify('Dodano zgłoszenie');
            userInfo.setRequest({});
            setTimeout(redirect, 3000);
          }
        });
      })

      .catch(err => {
        userInfo.initNotify('Wystąpił nieoczekiwany błąd !');
      });
  };
  return (
    <Container>
      {userInfo.notify !== '' && (
        <NotifyContainer>
          <NotifyText>{userInfo.notify}</NotifyText>
        </NotifyContainer>
      )}
      <HeaderText>Podsumowanie twojego zgłoszenia : </HeaderText>
      <Item>
        Zwierzę :<UserChoice>{animal}</UserChoice>
      </Item>
      <Item>
        Treść:
        <UserChoice> {content}</UserChoice>
      </Item>
      <Item>
        Wielkość:
        <UserChoice> {size}</UserChoice>
      </Item>
      <Item>
        Rasa:
        <UserChoice> {breed}</UserChoice>
      </Item>
      <Item>
        Kolor sierści:
        <UserChoice>{hairColour}</UserChoice>
      </Item>
      <Item>
        Znaki szczególne
        <UserChoice> {specialInfo}</UserChoice>
      </Item>
      <Item>
        Data zauważenia :
        <UserChoice>
          {moment(notice_date).format('D-MM-YYYY HH:mm:ss')}
        </UserChoice>
      </Item>
      <Item>
        Czy zabrano ze sobą :<UserChoice>{took}</UserChoice>
      </Item>
      <Item>Zdjęcia :</Item>
      <Images />
      <MyTouchableOpacity
        onPress={() => {
          sendRequest();
        }}>
        <MyText>Dodaj zgłoszenie</MyText>
      </MyTouchableOpacity>
    </Container>
  );
};
export default SummaryComponent;
