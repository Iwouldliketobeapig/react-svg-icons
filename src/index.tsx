import React, { lazy } from "react";
import { createRoot } from 'react-dom/client';
import styles from './index.less';
import 'normalize.css';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/home'));
const History = lazy(() => import('./pages/history'));

const route = createBrowserRouter([
  {
    path: '/',
    element:  <Home />,
  },
  {
    path: '/history',
    element: <History />,
  }
])

const App = () => {
  return (
    <div>
      <div>
        你好
      </div>
      <RouterProvider router={route} />
    </div>
  )
}

const rootNode = document.getElementById('root');
const root = createRoot(rootNode);
root.render(<App />);