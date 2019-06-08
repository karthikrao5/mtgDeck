import {createStore} from 'redux';
import {decksReducer} from "./DecksReducer";


export const store = createStore(decksReducer);