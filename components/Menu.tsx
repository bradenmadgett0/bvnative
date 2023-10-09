import React from 'react';
import {FlatList, Text} from 'react-native';
import {useQuery} from 'react-query';
import {fetchMenuItems, MenuItem} from '../services';
import styled from '@emotion/native';
import InfoBar from './InfoBar';

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

const Item = ({item}: {item: MenuItem}): JSX.Element => {
  return (
    <MenuItemContainer>
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
  );

  return (
    <MenuContainer>
      {menuItemsLoading ?? <Text>Loading...</Text>}
      {menuItems?.length ? (
        <FlatList
          data={menuItems}
          renderItem={menuItem => <Item item={menuItem.item} />}
        />
      ) : (
        <Text>No menu items</Text>
      )}
    </MenuContainer>
  );
};

export default Menu;
