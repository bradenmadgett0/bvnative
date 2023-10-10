import React from 'react';
import {useQuery} from 'react-query';
import {getOrders} from '../services';
import {Alert, FlatList, Text} from 'react-native';
import HeaderBar from './common/HeaderBar';
import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';

const OrderEntry = styled.TouchableOpacity({
  padding: 16,
  flexDirection: 'row',
  justifyContent: 'space-between',
});

const OrderHistory = (): JSX.Element => {
  const {data: ordersData, isLoading: ordersLoading} = useQuery(
    'ORDERS',
    () => getOrders(),
    {
      onError: e => Alert.alert('Something went wrong!'),
    },
  );

  const navigation = useNavigation();

  return (
    <>
      <HeaderBar withBack title="Orders" />
      {ordersLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={ordersData}
          renderItem={order => (
            <OrderEntry
              onPress={() =>
                // @ts-ignore
                navigation.navigate('OrderDetail', {cart: order.item.cart})
              }>
              <Text>{`Order ${order.item.id}`}</Text>
              <Text>{`$${order.item.cart.total}`}</Text>
            </OrderEntry>
          )}
        />
      )}
    </>
  );
};

export default OrderHistory;
