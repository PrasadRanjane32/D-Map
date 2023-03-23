import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CookiesProvider } from "react-cookie";
import reportWebVitals from './reportWebVitals';

/**red store */
import store from './Components/Quiz/red/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<>

  <Provider store={store}>
  <CookiesProvider>

    <React.StrictMode>
      <App />
    </React.StrictMode>
  </CookiesProvider>
  </Provider>
</>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
