import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getNonFavList = createAsyncThunk('GET_NONFAV', async () => {
  const nonFavRes = await axios.get('http://localhost:8080/nonFav');
  return nonFavRes.data;
});

export const nonFavListReducer = createSlice({
  name: 'nonFavList',
  initialState: [],
  reducers: {},
  extraReducers: {
    [getNonFavList.fulfilled]: (state, { payload }) => [...payload]
  }
});
