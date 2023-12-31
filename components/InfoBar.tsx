import React, {useMemo} from 'react';
import {useQuery} from 'react-query';
import {fetchCart} from '../services';
import HeaderBar from './common/HeaderBar';
import {Alert} from 'react-native';

const InfoBar = ({goToCart}: {goToCart: () => void}): JSX.Element => {
  const {data: cartData, isLoading: cartLoading} = useQuery(
    'CART',
    () => fetchCart(),
    {
      onError: e => Alert.alert('Something went wrong!'),
    },
  );

  const quantity = useMemo(() => {
    let runningTotal = 0;
    cartData?.cart_items?.forEach(item => {
      runningTotal += item.quantity;
    });
    return runningTotal;
  }, [cartData]);

  return (
    <HeaderBar
      title="My Great Restaurant"
      action={() => goToCart()}
      actionLabel={`Cart: ${cartLoading ? 0 : quantity}`}
    />
  );
};

export default InfoBar;
