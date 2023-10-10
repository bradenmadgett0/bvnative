import React, {useContext, useEffect, useState} from 'react';
import styled from '@emotion/native';
import {Alert, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation} from 'react-query';
import {login} from '../services';
import {UserContext} from '../App';
import {useNavigation} from '@react-navigation/native';

const LoginWrapper = styled.View({
  flex: 1,
  padding: 24,
  paddingTop: 64,
});
const LoginInput = styled.TextInput({
  padding: 16,
  backgroundColor: 'lightgrey',
  margin: 8,
});

const LoginButton = styled.TouchableOpacity({
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 24,
});

const LoginButtonLabel = styled.Text({
  fontWeight: 'bold',
  fontSize: 18,
});

const Login = (): JSX.Element => {
  const {user, setUser} = useContext(UserContext);
  const navigation = useNavigation();
  const loginMutation = useMutation(() => login(username, password), {
    onSuccess: () => {
      // Default test user
      AsyncStorage.setItem('user', 'dGVzdDp0ZXN0');
      setUser('dGVzdDp0ZXN0');
    },
    onError: () => Alert.alert('Something went wrong!'),
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user !== null) {
      // @ts-ignore
      navigation.navigate('Home');
    }
  }, [user, navigation]);

  return (
    <LoginWrapper>
      <Text>Username</Text>
      <LoginInput onChangeText={text => setUsername(text)} />
      <Text>Password</Text>
      <LoginInput onChangeText={text => setPassword(text)} />
      <LoginButton onPress={() => loginMutation.mutate()}>
        <LoginButtonLabel>Login</LoginButtonLabel>
      </LoginButton>
    </LoginWrapper>
  );
};

export default Login;
