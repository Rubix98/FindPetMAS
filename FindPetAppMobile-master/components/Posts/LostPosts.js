import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import Posts from './Posts';
import {withNavigationFocus} from 'react-navigation';
const LostPosts = props => {
  const FocusPosts = withNavigationFocus(Posts);
  return (
    <View>
      <FocusPosts key={Math.random()} navigate={props.navigation} no={0} />
    </View>
  );
};
export default withNavigationFocus(LostPosts);
