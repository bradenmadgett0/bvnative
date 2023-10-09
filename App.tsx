/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Button, SafeAreaView, StatusBar} from 'react-native';
import {fetchMenuItems} from './services';
import {QueryClientProvider, QueryClient} from 'react-query';
import Menu from './components/Menu';

function App(): JSX.Element {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView>
        <StatusBar />
        <Menu />
      </SafeAreaView>
    </QueryClientProvider>
  );
}

export default App;
