import React from 'react';
import {View, FlatList, Text} from 'react-native';
import {useQuery} from 'react-query';
import {fetchMenuItems, MenuItem} from '../services';

const Item = ({item}: {item: MenuItem}): JSX.Element => {
  return <Text>{item.title}</Text>;
};

const Menu = (): JSX.Element => {
  const {data: menuItems, isLoading: menuItemsLoading} = useQuery(
    'MENU_ITEMS',
    () => fetchMenuItems(),
  );

  console.log(menuItemsLoading);

  return (
    <View style={{padding: 16}}>
      {menuItemsLoading ?? <Text>Loading...</Text>}
      {menuItems?.length ? (
        <FlatList
          data={menuItems}
          renderItem={menuItem => <Item item={menuItem.item} />}
        />
      ) : (
        <Text>No menu items</Text>
      )}
    </View>
  );
};

export default Menu;
