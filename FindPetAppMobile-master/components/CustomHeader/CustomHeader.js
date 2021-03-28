import Icon from 'react-native-ionicons';
import React, {useContext} from 'react';
import {View, Text, Image} from 'react-native';
import Notify from '../Notify';
import {NewAppInfo} from '../../context/AppInfo';
import {ViewHeader, ViewHeaderNotify, NotifyText} from '../../styles/MenuStyle';
import IconApp from '../../images/ikonka.png';
const CustomHeader = ({navigation}) => {
  const userInfo = useContext(NewAppInfo);
  console.log(navigation);
  return (
    <View>
      {userInfo.notify === '' ? (
        <ViewHeader>
          <Icon
            name="md-menu"
            size={32}
            color="black"
            onPress={() => {
              navigation.openDrawer();
            }}
          />
          <View>
          <Image
            source={IconApp}
            style={{ flex: 1, width: 20, height:20}}
            resizeMode={'contain'}
          />
          </View>
        </ViewHeader>
      ) : (
        <ViewHeaderNotify>
          <Icon
            name="md-menu"
            size={32}
            color="white"
            onPress={() => {
              navigation.openDrawer();
            }}
          />
          <NotifyText>{userInfo.notify}</NotifyText>
          <View>
          <Image
            source={IconApp}
            style={{ flex: 1, width: 20, height:20}}
            resizeMode={'contain'}
          />
          </View>
        </ViewHeaderNotify>
      )}
    </View>
  );
};

export default CustomHeader;
