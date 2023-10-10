import {encode as btoa} from 'base-64';

export interface MenuItem {
  description: string;
  id: number;
  price: number;
  title: string;
}

export interface CartItem {
  cart: number;
  id: number;
  item: MenuItem;
  quantity: number;
}

export interface Cart {
  total: number;
  cart_items: CartItem[];
}

export interface Order {
  id: number;
  owner: number;
  cart: Cart;
}

export const fetchMenuItems = async (): Promise<MenuItem[]> => {
  const resp = await fetch('http://127.0.0.1:8000/api/menu', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (!resp?.ok) {
    throw new Error('Something went wrong!');
  }

  return await resp.json();
};

export const fetchCart = async (): Promise<Cart> => {
  const resp = await fetch('http://127.0.0.1:8000/api/cart/', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa('test:test'),
    },
  });

  if (!resp?.ok) {
    throw new Error('Something went wrong!');
  }

  return await resp.json();
};

export const addItemToCart = async (itemId: number) => {
  const resp = await fetch('http://127.0.0.1:8000/api/cart/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa('test:test'),
    },
    body: JSON.stringify({
      item: itemId,
    }),
  });

  if (!resp?.ok) {
    throw new Error('Something went wrong!');
  }

  return await resp.json();
};

export const placeOrder = async () => {
  const resp = await fetch('http://127.0.0.1:8000/api/orders/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa('test:test'),
    },
  });

  if (!resp?.ok) {
    throw new Error('Something went wrong!');
  }

  return await resp.json();
};

export const getOrders = async (): Promise<Order[]> => {
  const resp = await fetch('http://127.0.0.1:8000/api/orders/', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa('test:test'),
    },
  });

  if (!resp?.ok) {
    throw new Error('Something went wrong!');
  }

  return await resp.json();
};

export const login = async (
  username: string,
  password: string,
): Promise<boolean> => {
  const resp = await fetch('http://127.0.0.1:8000/api/login/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });

  if (!resp?.ok) {
    throw new Error('Something went wrong!');
  }

  return Promise.resolve(true);
};
