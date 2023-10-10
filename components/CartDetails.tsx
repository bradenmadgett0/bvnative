import React from 'react';
import styled from '@emotion/native';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {Cart, fetchCart, placeOrder} from '../services';
import {Alert, FlatList, Text} from 'react-native';
import HeaderBar from './common/HeaderBar';
import {useNavigation} from '@react-navigation/native';

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

export const CartItems = ({cart}: {cart?: Cart}): JSX.Element => {
  return (
    <>
      <CartTotal>
        <Text>Total</Text>
        <CartTotalLabel>
          {cart?.total ? `$${cart.total}` : '$0.00'}
        </CartTotalLabel>
      </CartTotal>
      {cart?.cart_items?.length ? (
        <FlatList
          data={cart?.cart_items}
          renderItem={cartItem => (
            <CartItem>
              <Text>{cartItem.item.item.title}</Text>
              <Text>{`${cartItem.item.item.price} x ${cartItem.item.quantity}`}</Text>
            </CartItem>
          )}
        />
      ) : (
        <NoItemsLabel>No items</NoItemsLabel>
      )}
    </>
  );
};

const CartDetails = (): JSX.Element => {
  const {
    data: cartData,
    isLoading: cartLoading,
    isFetching: cartFetching,
  } = useQuery('CART', () => fetchCart(), {
    onError: e => {
      Alert.alert('Something went wrong!');
    },
  });

  const queryClient = useQueryClient();

  const placeOrderMutation = useMutation(() => placeOrder(), {
    onSuccess: () => {
      queryClient.invalidateQueries('CART');
      Alert.alert('Order successfully placed!');
    },
    onError: e => {
      Alert.alert('Something went wrong!');
    },
  });

  const navigation = useNavigation();

  return (
    <>
      <HeaderBar
        withBack
        title="Cart"
        // @ts-ignore
        action={() => navigation.navigate('Orders')}
        actionLabel="Orders"
      />
      <CartDetailsPage>
        {cartLoading || cartFetching ? (
          <Text>Loading...</Text>
        ) : (
          <>
            <CartItems cart={cartData} />
            {cartData?.cart_items?.length ? (
              <OrderButton onPress={() => placeOrderMutation.mutate()}>
                <OrderButtonLabel>Place order</OrderButtonLabel>
              </OrderButton>
            ) : null}
          </>
        )}
      </CartDetailsPage>
    </>
  );
};

export default CartDetails;
