import React from 'react';
import styled from '@emotion/native';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {fetchCart, placeOrder} from '../services';
import {Alert, FlatList, Text, TouchableOpacity} from 'react-native';
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

const OrderButton = styled.TouchableOpacity({
  alignSelf: 'center',
  marginTop: 16,
});

const OrderButtonLabel = styled.Text({
  fontSize: 18,
  fontWeight: 'bold',
  color: 'green',
});

const NoItemsLabel = styled.Text({
  padding: 8,
});

const CartDetails = (): JSX.Element => {
  const {data: cartData, isLoading: cartLoading} = useQuery('CART', () =>
    fetchCart(),
  );

  const queryClient = useQueryClient();

  const placeOrderMutation = useMutation(() => placeOrder(), {
    onSuccess: () => {
      queryClient.invalidateQueries('CART');
      Alert.alert('Order successfully placed!');
    },
  });

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
          <>
            <FlatList
              data={cartData.cart_items}
              renderItem={cartItem => (
                <CartItem>
                  <Text>{cartItem.item.item.title}</Text>
                  <Text>{`${cartItem.item.item.price} x ${cartItem.item.quantity}`}</Text>
                </CartItem>
              )}
            />
            <OrderButton onPress={() => placeOrderMutation.mutate()}>
              <OrderButtonLabel>Place order</OrderButtonLabel>
            </OrderButton>
          </>
        ) : (
          <NoItemsLabel>No items</NoItemsLabel>
        )}
      </CartDetailsPage>
    </>
  );
};

export default CartDetails;
