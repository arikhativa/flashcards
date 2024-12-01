import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import {RootTabParamList} from './NavigationBar';
import {RouteProp} from '@react-navigation/native';
import {CardsStackParamList} from './CardsNavigationStack';

type CardScreenRouteProp = RouteProp<CardsStackParamList, 'Card'>;

interface CardScreenProps {
  route: CardScreenRouteProp;
}

export default function ObjectScreen({route}: CardScreenProps) {
  const {id} = route.params;

  return (
    <View>
      <Text>Profile Screen</Text>
      <Text>User ID: {id}</Text>
    </View>
  );
}
