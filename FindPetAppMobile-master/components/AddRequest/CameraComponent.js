import React, {useState, useContext} from 'react';

import ImagePicker from 'react-native-image-picker';
import {NewAppInfo} from '../../context/AppInfo';
const CameraComponent = props => {
  const userInfo = useContext(NewAppInfo);
  const [images, setImages] = useState(null);
  const [isTook, setTook] = useState(false);
  let temp = null;
  const options = {
    title: 'Wybierz zdjęcie zwierzęcia',
    takePhotoButtonTitle: 'Zrób zdjęcie',
    chooseFromLibraryButtonTitle: 'Wybierz zdjęcie z galerii',
    quality: 0.5,
    isVertical: true,
    originalRotation: 360,
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const takePicture = () => {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        //let blob = new Blob([response],{type:"image/jpeg"})
        //console.log(blob);
        // latitude,longitude

        setImages(response);
        userInfo.setPicture(response, 0);
      }
      props.navigation.navigate('SelectAnimal');
      //}
    });
  };
  const init = () => {
    takePicture();
  };
  if (isTook === false) {
    init();
    setTook(true);
  }

  return null;
};
export default CameraComponent;
