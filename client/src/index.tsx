import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import appStore from './stores/appStore';

ReactDOM.render(
  <StrictMode>
    <Provider store={appStore}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
