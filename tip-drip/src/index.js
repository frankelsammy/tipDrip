import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Header from './Header';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className='site-container'>
  <React.StrictMode>
      <Header />
      <App />
  </React.StrictMode>
   </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
