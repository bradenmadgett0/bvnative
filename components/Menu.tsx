import React from 'react';
import {Alert, FlatList, Text} from 'react-native';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {addItemToCart, fetchMenuItems, MenuItem} from '../services';
import styled from '@emotion/native';

const MenuContainer = styled.View({
  paddingHorizontal: 16,
});

const MenuItemContainer = styled.TouchableOpacity({
  margin: 8,
  padding: 8,
});

const MenuTitleBar = styled.View({
  justifyContent: 'space-between',
  flexDirection: 'row',
  marginBottom: 4,
});

const MenuTitle = styled.Text({
  fontSize: 18,
  fontWeight: 'bold',
});

const MenuItemDescription = styled.Text({
  fontSize: 14,
});

const Item = ({
  item,
  onPress,
}: {
  item: MenuItem;
  onPress: () => void;
}): JSX.Element => {
  return (
    <MenuItemContainer onPress={() => onPress()}>
      <MenuTitleBar>
        <MenuTitle>{item.title}</MenuTitle>
        <MenuTitle>{`$${item.price}`}</MenuTitle>
      </MenuTitleBar>
      <MenuItemDescription>{item.description}</MenuItemDescription>
    </MenuItemContainer>
  );
};

const Menu = (): JSX.Element => {
  const {data: menuItems, isLoading: menuItemsLoading} = useQuery(
    'MENU_ITEMS',
    () => fetchMenuItems(),
    {
      onError: e => Alert.alert('Something went wrong!'),
    },
  );

  const queryClient = useQueryClient();

  const addItemMutation = useMutation(
    (itemId: number) => addItemToCart(itemId),
    {
      onSuccess: () => queryClient.invalidateQueries('CART'),
    },
  );

  return (
    <MenuContainer>
      {menuItemsLoading ?? <Text>Loading...</Text>}
      {menuItems?.length ? (
        <FlatList
          data={menuItems}
          renderItem={menuItem => (
            <Item
              item={menuItem.item}
              onPress={() => addItemMutation.mutate(menuItem.item.id)}
            />
          )}
        />
      ) : (
        <Text>No menu items</Text>
      )}
    </MenuContainer>
  );
};

export default Menu;
