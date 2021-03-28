import React from 'react';
import {View, Text} from 'react-native';
import {NotifyText} from '../styles/NotifyStyle'
const Notify = props => {
  return <NotifyText text={props.text} />;
};
export default Notify;
