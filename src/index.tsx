import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Navigate,
} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { MoviesLayout } from './layouts/MoviesLayout/MoviesLayout';
import Movies from './pages/Movies/Movies';
import Favorites from './pages/Favorites/Favorites';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MoviesLayout />}>
      <Route index element={<Navigate replace to="/movies" />} />
      <Route path="movies" element={<Movies />} />
      <Route path="favorites" element={<Favorites />} />
    </Route>
  )
);

createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
