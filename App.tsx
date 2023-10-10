/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {createContext, useMemo, useState} from 'react';
import {StatusBar} from 'react-native';
import {QueryClientProvider, QueryClient} from 'react-query';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './components/Home';
import CartDetails from './components/CartDetails';
import OrderHistory from './components/OrderHistory';
import {Cart} from './services';
import OrderDetail from './components/OrderDetail';
import Login from './components/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Cart: undefined;
  Orders: undefined;
  OrderDetail: {
    cart: Cart;
  };
};

export const UserContext = createContext<any>(null);

function App(): JSX.Element {
  const queryClient = new QueryClient();
  const Stack = createNativeStackNavigator<RootStackParamList>();

  const [user, setUser] = useState<string | null>(null);

  const userValue = useMemo(() => {
    return {user, setUser};
  }, [user]);

  AsyncStorage.getItem('user').then(loggedInUser => setUser(loggedInUser));

  return (
    <UserContext.Provider value={userValue}>
      <QueryClientProvider client={queryClient}>
        <StatusBar />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Cart"
              component={CartDetails}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Orders"
              component={OrderHistory}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="OrderDetail"
              component={OrderDetail}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </UserContext.Provider>
  );
}

export default App;
