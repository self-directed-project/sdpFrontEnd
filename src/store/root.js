import { combineReducers, configureStore } from '@reduxjs/toolkit';

// import { favListReducer } from './getFav';
// import { nonFavListReducer } from './getNonFav';
import { listReducer } from './getList';

const reducer = combineReducers({
  // favListReducer: favListReducer.reducer,
  // nonFavListReducer: nonFavListReducer.reducer,
  listReducer: listReducer.reducer
});
const store = configureStore({
  reducer
});
export default store;
