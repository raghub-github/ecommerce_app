import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppProvider } from './context/ProductContext';
import { FilterContextProvider } from './context/filter_context';
import { CartProvider } from './context/cart_context';
import { UserProvider } from './context/user_context';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
// const domain = process.env.REACT_APP_AUTH_DOMAIN;
// const clientid = process.env.REACT_APP_AUTH_CLIENTID;
root.render(

  // <Auth0Provider
  //   domain={domain}
  //   clientId={clientid}
  //   authorizationParams={{
  //     redirect_uri: window.location.origin
  //   }}
  // >
  //   <React.StrictMode>
  //     <AppProvider>
  //       <FilterContextProvider>
  //         <CartProvider>
  //           <App />
  //         </CartProvider>
  //       </FilterContextProvider>
  //     </AppProvider>
  //   </React.StrictMode>
  // </Auth0Provider>

  // <React.StrictMode>
  <AppProvider>
    <UserProvider>
      <FilterContextProvider>
        <CartProvider>
          <App />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            bodyClassName="toastBody"
          />
        </CartProvider>
      </FilterContextProvider>
    </UserProvider>
  </AppProvider>
  // </React.StrictMode>

);
reportWebVitals();
