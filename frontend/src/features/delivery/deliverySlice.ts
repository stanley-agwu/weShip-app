import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorType, IDeliveryState, Delivery, State, LoggedInUser } from '../../types.ts';
import deliveryService from './deliveryService';

const user: LoggedInUser = JSON.parse(localStorage.getItem('user') || 'false');

const initialState: IDeliveryState = {
  deliveries: { deliveries: [] },
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

// create delivery
export const createDelivery = createAsyncThunk('delivery/create',
  async (deliveryData: Delivery, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as State;
      const { token } = state.auth.user;
      return await deliveryService.createDelivery(deliveryData, token);
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message
      else if (typeof error === 'string') message = error.toString();
      else message = (error: ErrorType) => error.response && error.response.data && error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  })

// get user deliveries
export const getDeliveries = createAsyncThunk('delivery/getAll',
  async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as State;
    const { token } = state.auth.user;
    return await deliveryService.getDeliveries(token as string);
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message
    else if (typeof error === 'string') message = error.toString();
    else message = (error: ErrorType) => error.response && error.response.data && error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
})

export const deliverySlice = createSlice({
  name: 'delivery',
  initialState,
  reducers: {
    reset: (state: IDeliveryState) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDelivery.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDelivery.fulfilled, (state, { payload }) => ({
        ...state,
        isLoading : false,
        isSuccess : true,
        deliveries: { deliveries: [...state.deliveries.deliveries, payload ] as Delivery[]},
      }))
      .addCase(createDelivery.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        typeof action.payload === 'string'
        ? state.errorMessage = action.payload
        : state.errorMessage = JSON.stringify(action.payload);
      })
      .addCase(getDeliveries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDeliveries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.deliveries = action.payload;
      })
      .addCase(getDeliveries.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        typeof action.payload === 'string'
        ? state.errorMessage = action.payload
        : state.errorMessage = JSON.stringify(action.payload);
      })
  }
});

export const { reset } = deliverySlice.actions;
export default deliverySlice.reducer;