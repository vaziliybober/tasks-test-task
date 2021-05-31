import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

import { QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';

import App from './components/toplevel/App';

const queryClient = new QueryClient();

axios.defaults.baseURL = 'http://intravision-task.test01.intravision.ru';

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
  document.getElementById('root')
);
