import { createStore } from 'redux'
import rootReducer from '../Reducers/reducers'


let store = createStore(rootReducer);

export default store;