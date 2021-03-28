import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {DrawerItems} from 'react-navigation-drawer';
import {NewAppInfo} from '../../context/AppInfo';
import Notify from '../Notify';
const CustomDrawerNavigator = props => (
  <View style={{flex: 1}}>
    <DrawerItems
      activeBackgroundColor={'#27ae60'}
      activeTintColor={'white'}
      iconContainerStyle={{width: 30}}
      {...props}
    />
  </View>
);

export default CustomDrawerNavigator;
