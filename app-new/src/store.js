import { legacy_createStore as createStore } from 'redux';
import rootReducer from './Component/Reducers';

const store = createStore(rootReducer);
export default store;