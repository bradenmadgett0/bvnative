import React, {useContext} from 'react';
import Menu from './Menu';
import InfoBar from './InfoBar';
import {SafeAreaView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList, UserContext} from '../App';
import styled from '@emotion/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogoutButton = styled.TouchableOpacity({
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 24,
});

const LogoutText = styled.Text({
  fontWeight: 'bold',
  color: 'red',
});

const Home = (
  props: NativeStackScreenProps<RootStackParamList, 'Home'>,
): JSX.Element => {
  const {setUser} = useContext(UserContext);
  return (
    <SafeAreaView>
      <InfoBar goToCart={() => props.navigation.navigate('Cart')} />
      <Menu />
      <LogoutButton
        onPress={() => {
          AsyncStorage.removeItem('user');
          setUser(null);
          props.navigation.replace('Login');
        }}>
        <LogoutText>Logout</LogoutText>
      </LogoutButton>
    </SafeAreaView>
  );
};

export default Home;
