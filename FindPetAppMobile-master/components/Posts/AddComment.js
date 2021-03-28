import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableHighlight,
  Image,
  ScrollView,
} from 'react-native';
import {NewAppInfo} from '../../context/AppInfo';
import MapboxGL from '@react-native-mapbox-gl/maps';
import img from '../photo.png';
import axios from 'axios';
import moment from 'moment';
import ImagePicker from 'react-native-image-picker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {
  NotifyContainer,
  NotifyTextContainer,
  ItemAtribute,
  InputText,
  FormButton,
  FormText,
  PhotosContainer,
  Img,
  MapViewer,
  MapView
} from '../../styles/AddCommentStyle';
const AddComment = props => {
  console.log(props);
  const options = {
    title: 'Wybierz zdjęcie zwierzęcia',
    takePhotoButtonTitle: 'Zrób zdjęcie',
    chooseFromLibraryButtonTitle: 'Wybierz zdjęcie z galerii',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  let tempArray = [img, img, img, img];
  const [isVisible, setIsVisible] = useState(false);
  const userInfo = useContext(NewAppInfo);
  const [content, setContent] = useState('');
  const [date, setDate] = useState(undefined);
  const [location, setLocation] = useState([18.598074, 53.013683]);
  const [locationName, setLocationName] = useState('');
  const [photos, setPhotos] = useState(tempArray);
  MapboxGL.setAccessToken(
    'pk.eyJ1IjoibWtsaW1lazE5OTciLCJhIjoiY2szd3Z4ZW9rMTA5ajNkb3B4cXd6ZW9wNSJ9.060xIr41HznBuJS_UYt1IA',
  );

  const takePicture = index => {
    let temp = photos;
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        temp[index] = response;
        console.log(temp);
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        setPhotos([...temp]);
      }
    });
  };
  const changeVisible = () => {
    let temp = isVisible;
    setIsVisible(!temp);
  };
  const confirm = date => {
    changeVisible();
    setDate(date);
  };
  const updateLocationInfo = async () => {
    //pk.eyJ1IjoibWtsaW1lazE5OTciLCJhIjoiY2szd3Z4ZW9rMTA5ajNkb3B4cXd6ZW9wNSJ9.060xIr41HznBuJS_UYt1IA
    //https://api.mapbox.com/geocoding/v5/mapbox.places/18.599031491675078,53.010916449085045.json?access_token=pk.eyJ1IjoibWtsaW1lazE5OTciLCJhIjoiY2szd3Z4ZW9rMTA5ajNkb3B4cXd6ZW9wNSJ9.060xIr41HznBuJS_UYt1IA
    await axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${location[0]},${location[1]}.json?access_token=pk.eyJ1IjoibWtsaW1lazE5OTciLCJhIjoiY2szd3Z4ZW9rMTA5ajNkb3B4cXd6ZW9wNSJ9.060xIr41HznBuJS_UYt1IA`,
      )
      .then(response => {
        setLocationName(response.data.features[0].place_name);
      });
  };
  const sendComment = async id => {
    const redirect = () => {
      props.navigation.navigate('Home');
    };
    await userInfo.initNotify('Trwa dodawanie komentarza');
    const data = new FormData();
    let counter = 0;
    data.append('idUżytkownik', userInfo.user.idUżytkownik);
    data.append('tresc', content || '');
    data.append('komentarz', id);
    console.log(moment().format('YYYY-MM-D HH:mm:ss'));
    data.append('data_zgloszenia', moment().format('YYYY-MM-D HH:mm:ss'));
    data.append(
      'data_time',
      moment(date).format('YYYY-MM-D HH:mm:ss'),
    );
    data.append('Szerokosc_Geograficzna', location[1]);
    data.append('Dlugosc_Geograficzna', location[0]);
    for (var i = 0; i < 4; i++) {
      if (photos[i].fileSize) {
        data.append('zdjecia', {
          uri: photos[0].uri,
          type: photos[0].type,
          name: photos[0].fileName,
        });
        counter++;
      }
    }
    const config = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'multipart/form-data',
      },
      body: data,
    };
    data.append('ilosc_zdjec', counter);
    await fetch(userInfo.apiip + '/posty', config).then(res => {
      res.text().then(text => {
        let json = JSON.parse(text);
        if (json.status === 'success') {
          setTimeout(redirect, 3000);
        }
      });
    });
    await userInfo.initNotify('Dodano komentarz.');
    await setTimeout(redirect, 2000);
  };
  useEffect(() => {
    console.log('AAAA');
    if (photos[0].latitude && photos[0].longitude) {
      setLocation([photos[0].longitude, photos[0].latitude]);
      updateLocationInfo();
    }
  }, [photos]);
  return (
    <View>
      {userInfo.notify !== '' && (
        <NotifyContainer>
          <NotifyTextContainer>{userInfo.notify}</NotifyTextContainer>
        </NotifyContainer>
      )}
      <ScrollView>
        <View>
          <ItemAtribute>Treść:</ItemAtribute>
          <InputText
            onChangeText={text => {
              setContent(text);
            }}
            multiline={true}
            numberOfLines={4}
            placeholder="Podaj treść"
          />
        </View>
        <View>
          <ItemAtribute>Data:</ItemAtribute>
          <FormButton
            onPress={() => {
              changeVisible();
            }}>
            <FormText>{moment(date).format('D-MM-YYYY HH:mm:ss')}</FormText>
          </FormButton>
          <DateTimePicker
            mode="datetime"
            locale="pl"
            isVisible={isVisible}
            onConfirm={date => {
              confirm(date);
            }}
            onCancel={changeVisible}
          />
        </View>
        <ItemAtribute>Zdjęcia:</ItemAtribute>
        {console.log(photos[0])}
        <PhotosContainer>
          <TouchableHighlight
            underlayColor="white"
            onPress={() => takePicture(0)}>
            <Img source={photos[0].uri ? {uri: photos[0].uri} : photos[0]} />
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="white"
            onPress={() => takePicture(1)}>
            <Img source={photos[1].uri ? {uri: photos[1].uri} : photos[1]} />
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="white"
            onPress={() => takePicture(2)}>
            <Img source={photos[2].uri ? {uri: photos[2].uri} : photos[2]} />
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="white"
            onPress={() => takePicture(3)}>
            <Img source={photos[3].uri ? {uri: photos[3].uri} : photos[3]} />
          </TouchableHighlight>
        </PhotosContainer>
        <ItemAtribute>Lokalizacja:</ItemAtribute>
        <MapView>
          <MapViewer
            onPress={({geometry}) => {
              console.log(geometry.coordinates);
              setLocation(geometry.coordinates);
              updateLocationInfo();
            }}>
            <MapboxGL.Camera zoomLevel={14} centerCoordinate={location} />
            <MapboxGL.PointAnnotation
              key="punkt"
              id="punkt"
              title="Test"
              coordinate={location}></MapboxGL.PointAnnotation>
          </MapViewer>
        </MapView>
        <Text>{locationName}</Text>
        <FormButton
          onPress={() => {
            sendComment(props.navigation.state.params.id);
          }}>
          <FormText>Dodaj komentarz</FormText>
        </FormButton>
      </ScrollView>
    </View>
  );
};
export default AddComment;
