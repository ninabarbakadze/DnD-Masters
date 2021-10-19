import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import { applyMiddleware, createStore } from 'redux';
// import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
// import allReducer from './reducers';
import App from './App';
import reportWebVitals from './reportWebVitals';
import appStore from './stores/appStore';

// const store = createStore(allReducer, applyMiddleware(thunk));

ReactDOM.render(
  <StrictMode>
    <Provider store={appStore}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
