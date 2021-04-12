/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Picker,
  Button,
  TouchableOpacity,
} from 'react-native';
import {NewAppInfo} from '../../context/AppInfo';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {
  MyTextInput,
  MyText,
  MyTouchableOpacity,
  MyPicker,
  LabelText,
  Container,
  PicturesContainer,
  AnimalPhoto,
} from '../../styles/DataInfoStyle';
import ImagePicker from 'react-native-image-picker';
import {CheckBox} from 'react-native-elements';
import {Image, TouchableHighlight, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
const DataInfo = props => {
  const [checked, setChecked] = useState(false);
  const [content, setContent] = useState('');
  const [size, setSize] = useState('Mały');
  const [hairColour, setHairColour] = useState('');
  const [specialInfo, setSpecialInfo] = useState('');
  const [useDate, setDate] = useState(new Date('2020-06-12T14:42:42'));
  const [isVisible, setIsVisible] = useState(false);
  const userInfo = useContext(NewAppInfo);
  const [breed, setBreed] = useState('');
  const DefaultImage = require('../photo.png');
  let images = [DefaultImage, DefaultImage, DefaultImage, DefaultImage];
  const updateChecked = () => {
    setChecked(!checked);
  };
  for (var i = 0; i < 4; i++) {
    if (userInfo.request.images[i] === undefined) {
      images[i] = DefaultImage;
    } else {
      images[i] = userInfo.request.images[i];
    }
  }

  const [imageSource, setImageSource] = useState(images);
  const options = {
    title: 'Wybierz zdjęcie zwierzęcia',
    takePhotoButtonTitle: 'Zrób zdjęcie',
    chooseFromLibraryButtonTitle: 'Wybierz zdjęcie z galerii',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const confirm = date => {
    changeVisible();
    setDate(date);
  };

  const changeVisible = () => {
    setIsVisible(!isVisible);
  };

  const takePicture = id => {
    let temp = imageSource;
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        temp[id] = response;
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        setImageSource([...temp]);
      }
    });
  };
  const locationInfo = async () => {
    let temp = await userInfo.request;
    temp.content = content;
    temp.size = size;
    temp.breed = breed;
    temp.hairColour = hairColour;
    temp.specialInfo = specialInfo;
    temp.notice_date = useDate;
    temp.took = checked;
    await userInfo.setRequest(temp);
    await props.navigation.navigate('LocationInfo');
  };
  useEffect(() => {
    for (var i = 0; i < 4; i++) {
      userInfo.setPicture(imageSource[i], i);
    }
    if (userInfo.request.images[0].timestamp !== undefined) {
      setDate(new Date(userInfo.request.images[0].timestamp));
    }
  }, [imageSource, userInfo]);
  return (
    <Container>
      <ScrollView>
        <MyTextInput
          onChangeText={text => {
            setContent(text);
          }}
          value={content}
          placeholderTextColor="white"
          placeholder="Podaj treść zgłoszenia"
          multiline={true}
          numberOfLines={3}
        />
        <LabelText>Wybierz wielkość zwierzęcia:</LabelText>
        <MyPicker>
          <Picker
            style={{color: 'white'}}
            selectedValue={size}
            onValueChange={itemValue => setSize(itemValue)}>
            <Picker.Item style={{color: 'white'}} label="Mały" value="Mały" />
            <Picker.Item
              style={{color: 'white'}}
              label="Średni"
              value="Średni"
            />
            <Picker.Item style={{color: 'white'}} label="Duży" value="Duży" />
          </Picker>
        </MyPicker>

        <MyTextInput
          placeholder="Podaj kolor sierści"
          placeholderTextColor="white"
          value={hairColour}
          onChangeText={text => {
            setHairColour(text);
          }}
        />
        <MyTextInput
          placeholder="Podaj znaki szczególne"
          placeholderTextColor="white"
          value={specialInfo}
          onChangeText={text => {
            setSpecialInfo(text);
          }}
        />
        <MyTextInput
          placeholder="Podaj rasę"
          placeholderTextColor="white"
          value={breed}
          onChangeText={text => {
            setBreed(text);
          }}
        />
        <LabelText>
          Wybierz datę zauważenia(jeśli nie została ustawiona automatycznie):
        </LabelText>
        <MyTouchableOpacity onPress={changeVisible}>
          <MyText>{moment(useDate).format('D-MM-YYYY HH:mm:ss')}</MyText>
        </MyTouchableOpacity>
        <DateTimePicker
          mode="datetime"
          locale="pl"
          isVisible={isVisible}
          onConfirm={date => {
            confirm(date);
          }}
          onCancel={changeVisible}
        />
        <PicturesContainer>
          <TouchableHighlight
            underlayColor="white"
            onPress={() => takePicture(0)}>
            <AnimalPhoto source={imageSource[0]} />
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor="white"
            onPress={() => takePicture(1)}>
            <AnimalPhoto source={imageSource[1]} />
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="white"
            onPress={() => takePicture(2)}>
            <AnimalPhoto source={imageSource[2]} />
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="white"
            onPress={() => takePicture(3)}>
            <AnimalPhoto source={imageSource[3]} />
          </TouchableHighlight>
        </PicturesContainer>
        <CheckBox
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          title="Czy wziąłeś ze sobą ?"
          checked={checked}
          onPress={() => {
            updateChecked();
          }}
        />
        <MyTouchableOpacity
          onPress={() => {
            locationInfo();
          }}>
          <MyText>Dalej</MyText>
        </MyTouchableOpacity>
      </ScrollView>
    </Container>
  );
};
export default DataInfo;
