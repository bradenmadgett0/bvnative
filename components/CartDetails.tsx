import React from 'react';
import styled from '@emotion/native';
import {useQuery} from 'react-query';
import {fetchCart} from '../services';
import {FlatList, Text} from 'react-native';
import HeaderBar from './common/HeaderBar';

const CartDetailsPage = styled.View({
  paddingHorizontal: 16,
});

const CartItem = styled.View({
  justifyContent: 'space-between',
  flexDirection: 'row',
  padding: 8,
});

const CartTotal = styled.View({
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: 8,
  borderBottomColor: 'black',
  borderBottomWidth: 1,
});

const CartTotalLabel = styled.Text({
  fontWeight: 'bold',
});

const CartDetails = (): JSX.Element => {
  const {data: cartData, isLoading: cartLoading} = useQuery('CART', () =>
    fetchCart(),
  );

  return (
    <>
      <HeaderBar withBack title="Cart" />
      <CartDetailsPage>
        {cartLoading ? (
          <Text>Loading...</Text>
        ) : (
          <CartTotal>
            <Text>Total</Text>
            <CartTotalLabel>
              {cartData?.total ? `$${cartData.total}` : '$0.00'}
            </CartTotalLabel>
          </CartTotal>
        )}

        {!cartLoading && cartData?.cart_items?.length ? (
          <FlatList
            data={cartData.cart_items}
            renderItem={cartItem => (
              <CartItem>
                <Text>{cartItem.item.item.title}</Text>
                <Text>{`${cartItem.item.item.price} x ${cartItem.item.quantity}`}</Text>
              </CartItem>
            )}
          />
        ) : (
          <Text>No items</Text>
        )}
      </CartDetailsPage>
    </>
  );
};

export default CartDetails;
