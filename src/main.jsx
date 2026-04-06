import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './index.css';
import Home from './pages/Home/Home';
import FrenchLearner from './pages/French/French';
import BirthdayForMonica from './pages/Birthday/Birthday';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/monica-17-bday',
    element: <BirthdayForMonica />,
  },
  // {
  //   path: '/josh-and-mon',
  //   element: <ValentinesForMonica />,
  // },

  {
    path: '/french',
    element: <FrenchLearner />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
