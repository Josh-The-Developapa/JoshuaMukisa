import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './index.css';
import Home from './pages/Home/Home';
import ValentinesForMonica from './pages/Valentines/Valentines';
import RebuiltInGold from './pages/Sorry/Sorry';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  // {
  //   path: '/josh-and-mon',
  //   element: <ValentinesForMonica />,
  // },

  {
    path: '/sorry',
    element: <RebuiltInGold />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
