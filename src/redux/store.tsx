// store.js
import { createStore } from 'redux';
import rootReducer from './reducers'; // You need to create your own root reducer

const store = createStore(rootReducer); // Create the Redux store with your root reducer

export default store;
