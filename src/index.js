import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';
import './css/index.css';
import App from './components/App.js';

const queryClient = new QueryClient();

axios.defaults.baseURL = 'http://intravision-task.test01.intravision.ru';

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
