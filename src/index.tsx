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
import { Provider } from 'react-redux';
import { store } from './redux/store';

import { MoviesLayout } from './layouts/MoviesLayout/MoviesLayout';
import Movies from './pages/Movies/Movies';
import Favorites from './pages/Favorites/Favorites';
import { FAVORITES_PATH, MOVIES_PATH } from './constants';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MoviesLayout />}>
      <Route index element={<Navigate replace to={MOVIES_PATH} />} />
      <Route path={MOVIES_PATH} element={<Movies />} />
      <Route path={FAVORITES_PATH} element={<Favorites />} />
    </Route>
  )
);

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
