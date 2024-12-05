import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export default function Example({style}: Props) {
  return <View style={style} />;
}

const styles = StyleSheet.create({});
