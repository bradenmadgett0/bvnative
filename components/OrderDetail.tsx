import React from 'react';
import HeaderBar from './common/HeaderBar';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {CartItems} from './CartDetails';

const OrderDetail = ({
  route,
}: NativeStackScreenProps<RootStackParamList, 'OrderDetail'>): JSX.Element => {
  const cart = route.params.cart;
  return (
    <>
      <HeaderBar withBack title="Order Details" />
      <CartItems cart={cart} />
    </>
  );
};

export default OrderDetail;
