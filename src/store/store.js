import {applyMiddleware, combineReducers, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist'
import {decksReducer} from "./DecksReducer";
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import {imagesReducer} from "./ImagesReducer";
import {deckListReducer} from "./DeckListReducer";

const persistConfig = {
  key: 'root',
  storage
};
const persistedReducer = persistReducer(persistConfig, combineReducers(
  {
    deck: decksReducer,
    images: imagesReducer,
    deckList: deckListReducer
  }
));
//
export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
// export const store = createStore(combineReducers(
//   {
//     deck: decksReducer,
//     images: imagesReducer
//   }
// ), applyMiddleware(thunk));