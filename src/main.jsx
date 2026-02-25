import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './index.css';
import Home from './pages/Home/Home';
import ValentinesForMonica from './pages/Valentines/Valentines';
import ForexGraphs from './pages/Economics/Economics';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/josh-and-mon',
    element: <ValentinesForMonica />,
  },
  {
    path: '/econ-monica',
    element: <ForexGraphs />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
