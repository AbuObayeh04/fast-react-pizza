import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './ui/Home';
import Menu, { loader as menuLoader } from './features/menu/Menu';
import Order, { loader as orderLoader } from './features/order/Order';
import Cart from './features/cart/Cart';
import CreateOrder, {
  action as createOrderAction,
} from './features/order/CreateOrder';
import Error from './ui/Error';
import AppLayout from './ui/AppLayout';

// all routes of the application in one place.
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />, // Error boundary for all routes.
    children: [
      { path: '/', element: <Home /> },
      { path: '/menu', element: <Menu />, loader: menuLoader },
      { path: '/cart', element: <Cart /> },
      {
        path: 'order/new',
        element: <CreateOrder />,
        action: createOrderAction,
      },
      { path: 'order/:orderId', element: <Order />, loader: orderLoader },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
