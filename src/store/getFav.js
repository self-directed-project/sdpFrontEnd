import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getFavList = createAsyncThunk('GET_FAV', async () => {
  const favRes = await axios.get('http://localhost:8080/fav');
  return favRes.data;
});

export const favListReducer = createSlice({
  name: 'favList',
  initialState: [],
  reducers: {},
  extraReducers: {
    [getFavList.fulfilled]: (state, { payload }) => [...payload]
  }
});

// export default listReducer.reducer;
