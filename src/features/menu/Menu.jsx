import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';

function Menu() {
  const menu = useLoaderData(); // to fetch data from the loader.

  return (
    <ul className="divide-y divide-stone-200 px-2">
      <h1>Menu</h1>
      {menu.map((pizza) => (
        <MenuItem key={pizza.id} pizza={pizza} />
      ))}
    </ul>
  );
}

// to get menu data
export function loader() {
  const menu = getMenu();
  return menu;
}

export default Menu;
