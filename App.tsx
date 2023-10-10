/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {QueryClientProvider, QueryClient} from 'react-query';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './components/Home';
import CartDetails from './components/CartDetails';
import OrderHistory from './components/OrderHistory';
import {Cart} from './services';
import OrderDetail from './components/OrderDetail';

export type RootStackParamList = {
  Home: undefined;
  Cart: undefined;
  Orders: undefined;
  OrderDetail: {
    cart: Cart;
  };
};

function App(): JSX.Element {
  const queryClient = new QueryClient();
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
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
  );
}

export default App;
