export interface MenuItem {
  description: string;
  id: number;
  price: number;
  title: string;
}

export const fetchMenuItems = async (): Promise<MenuItem[]> => {
  const resp = await fetch('http://127.0.0.1:8000/api/menu', {
    method: 'GET',
  });

  if (!resp?.ok) {
    throw new Error('Something went wrong!');
  }

  return await resp.json();
};
