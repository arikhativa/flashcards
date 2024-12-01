import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {Card} from '../types/Card';
import {padding} from '../constants/styles';
import CarouselWrapper, {CarouselWrapperRef} from '../shared/CarouselWrapper';
import CardBrowse from './CardBrowse';

interface BrowseManagerProps {
  cards: Card[];
}

export default function BrowseManager({cards}: BrowseManagerProps) {
  const carouselWrapperRef = useRef<CarouselWrapperRef>(null);

  const getPage = (index: number) => {
    if (!cards.length) {
      return <Text>No Cards</Text>; // TODO make this better
    }
    if (index === cards.length) {
      console.error('bad index', index, 'cards.length', cards.length);
      return null; // this
    }
    return (
      <CardBrowse index={index} length={cards.length} card={cards[index]} />
    );
  };

  const renderItem = ({index}: {index: number}) => {
    return (
      <View
        style={[
          padding.top3,
          {
            flex: 1,
            justifyContent: 'flex-start',
          },
        ]}>
        {getPage(index)}
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <CarouselWrapper
        ref={carouselWrapperRef}
        length={cards.length ? cards.length - 1 : 0}
        renderItem={renderItem}
      />
    </View>
  );
}
