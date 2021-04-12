import Icon from 'react-native-ionicons';
import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';

import CustomDrawerNavigator from './components/CustomDrawerNavigator';
import StartView from './components/StartView';
import {createStackNavigator} from 'react-navigation-stack';
import CameraComponent from './components/AddRequest/CameraComponent';
import SelectAnimal from './components/AddRequest/SelectAnimal';
import DataInfo from './components/AddRequest/DataInfo';
import LocationInfo from './components/AddRequest/LocationInfo';
import SummaryComponent from './components/AddRequest/SummaryComponent';
import Profile from './components/Profile/Profile';
import EditProfile from './components/Profile/EditProfile';
import EditPosts from './components/Posts/EditPosts'
import SelectLogin from './components/Profile/SelectLogin';
import RegularLogin from './components/Profile/RegularLogin';
import UniqueCodeLogin from './components/Profile/UniqueCodeLogin';
import LostPosts from './components/Posts/LostPosts';
import FindPosts from './components/Posts/FindPosts';
import AddComment from './components/Posts/AddComment';
import Post from './components/Posts/Post';
import {withNavigationFocus} from 'react-navigation';
const FindPostsFocus = withNavigationFocus(FindPosts);
const LostPostsFocus = withNavigationFocus(LostPosts);
const ProfileFocus = withNavigationFocus(Profile);
const MainNavigator = createDrawerNavigator(
  {
    Home: {
      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <Icon name="md-home" style={{color: tintColor}} />
        ),
        drawerLabel: 'Strona główna',
      },
      screen: StartView,
    },

    Profile: {
      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <Icon name="md-person" style={{color: tintColor}} />
        ),
        drawerLabel: 'Mój profil',
      },
      screen: ProfileFocus,
      initialRouteName: Profile,
    },
    Settings2: {
      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <Icon name="md-alert" style={{color: tintColor}} />
        ),
        drawerLabel: 'Zauważone zwierzęta',
      },
      screen: FindPostsFocus,
    },
    Settings3: {
      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <Icon name="md-help" style={{color: tintColor}} />
        ),
        drawerLabel: 'Zgubione zwierzęta',
      },
      screen: LostPostsFocus,
    },
    SelectLogin: {
      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <Icon name="md-log-in" style={{color: tintColor}} />
        ),
        drawerLabel: 'Zaloguj się',
      },
      screen: SelectLogin,
    },
    /*
    About: {
      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <Ionicons name="ios-person" style={{color: tintColor}} />
        ),
        drawerLabel: 'About',
      },
      screen: About,
    },
    */
  },
  {
    contentComponent: CustomDrawerNavigator,
  },
);
export const AppStack = createStackNavigator(
  {
    MainNavigator: {
      screen: MainNavigator,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },

    Camera: {
      screen: CameraComponent,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },
    StartView: {
      screen: StartView,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },
    SelectAnimal: {
      screen: SelectAnimal,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },
    DataInfo: {
      screen: DataInfo,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },
    LocationInfo: {
      screen: LocationInfo,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },
    SummaryComponent: {
      screen: SummaryComponent,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },
    EditProfile: {
      screen: EditProfile,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },
    EditPosts: {
      screen: EditPosts,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },
    RegularLogin: {
      screen: RegularLogin,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },
    UniqueCodeLogin: {
      screen: UniqueCodeLogin,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },
    AddComment: {
      screen: AddComment,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },
    Post: {
      screen: Post,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },
  },
  {headerMode: 'none'},
);
/*
export const OtherNavigator = createStackNavigator(
  {
    MainNavigator: {
      screen: MainNavigator,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },
  },

  {
    Camera: {
      screen: Camera,
      initialRouteName:'Camera',
      navigationOptions: {
        header: null,
      },
    },
  },
  {headerMode: 'none'},
);
*/
/*
const OtherNavigator = createStackNavigator(
  {
    MainNavigator: {
      screen: MainNavigator,
    },
  },
  {
    Camera: {
      screen: Camera,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
        headerMode: 'none',
      },
    },
  },
  {headerMode: 'none'},
);
*/
const MainApp = createAppContainer(AppStack);
export default MainApp;
