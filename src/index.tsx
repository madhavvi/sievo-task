import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import axios from 'axios';
import reducers from './Redux/rootReducer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './Redux/rootSaga';

axios.defaults.baseURL = 'https://sievo-react-assignment.azurewebsites.net/api/data'

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);