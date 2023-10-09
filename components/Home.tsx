import React from 'react';
import Menu from './Menu';
import InfoBar from './InfoBar';
import {SafeAreaView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

const Home = (
  props: NativeStackScreenProps<RootStackParamList, 'Home'>,
): JSX.Element => {
  return (
    <SafeAreaView>
      <InfoBar goToCart={() => props.navigation.navigate('Cart')} />
      <Menu />
    </SafeAreaView>
  );
};

export default Home;
