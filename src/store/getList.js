import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getList = createAsyncThunk('GET_LIST', async () => {
  const params = {
    memberId: 1,
    meetingRoomId: 2
  };
  const res = await axios.get('http://localhost:8080/meeting-rooms', {
    params
  });
  return res.data;
});

export const listReducer = createSlice({
  name: 'list',
  initialState: [],
  reducers: {},
  extraReducers: {
    [getList.fulfilled]: (state, { payload }) => [{ ...payload }]
  }
});
