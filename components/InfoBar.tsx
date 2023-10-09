import React from 'react';
import {useQuery} from 'react-query';
import {fetchCart} from '../services';
import HeaderBar from './common/HeaderBar';

const InfoBar = ({goToCart}: {goToCart: () => void}): JSX.Element => {
  const {data: cartData, isLoading: cartLoading} = useQuery('CART', () =>
    fetchCart(),
  );

  return (
    <HeaderBar
      title="My Great Restaurant"
      action={() => goToCart()}
      actionLabel={`Cart: ${cartLoading ? 0 : cartData?.cart_items.length}`}
    />
  );
};

export default InfoBar;
