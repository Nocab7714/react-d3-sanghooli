// import { StrictMode } from 'react' // 暫時先將 StrictMode 移除，有需要可以打開加入
import { createRoot } from 'react-dom/client'

import router from './routes'
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import './assets/scss/all.scss';
import store from './redux/store';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)