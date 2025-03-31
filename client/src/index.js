import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/style.scss';
import reportWebVitals from './reportWebVitals';
import { CommonProvider } from './contexts/common/commonContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <CommonProvider> {/* Place CommonProvider first */}
      <App />
    </CommonProvider>
  </BrowserRouter>
);


reportWebVitals();
