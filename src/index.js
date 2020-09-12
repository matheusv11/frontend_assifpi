import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes/routes';
import {AuthProvider} from './components/auth';

ReactDOM.render(
  <AuthProvider>
    <Routes />
  </AuthProvider>,
  document.getElementById('root')
);