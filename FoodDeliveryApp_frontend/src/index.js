import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'react-hot-toast';
import StoreContextProvider from './Context/StoreContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
 <GoogleOAuthProvider clientId='903446393348-bltqjjlf6u17l7psn6niigdn4e0j8854.apps.googleusercontent.com'>

  <StoreContextProvider>
    
    <BrowserRouter>
    
    <App />
    
    <Toaster/>
    
    </BrowserRouter>
  
  </StoreContextProvider>
  
  </GoogleOAuthProvider>
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
