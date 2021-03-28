import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import Posts from './Posts';
import {withNavigationFocus} from 'react-navigation';
import {NavigationEvents} from 'react-navigation';
const FindPosts = props => {
  const FocusPosts = withNavigationFocus(Posts);
  return (
    <View>
      <FocusPosts key={Math.random()} navigate={props.navigation} no={1} />
    </View>
  );
};
export default withNavigationFocus(FindPosts);
