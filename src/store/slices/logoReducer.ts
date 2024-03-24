import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { CarLogo, LogosState } from '../../types';

export const fetchLogos = createAsyncThunk<CarLogo[], void, { rejectValue: SerializedError }>(
  'logos/fetchLogos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/logos.json');
      if (!response.ok) throw new Error('Network response was not ok');
      const data: CarLogo[] = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue({ name: error.name, message: error.message, stack: error.stack });
      }
      return rejectWithValue(new Error('An unknown error occurred'));
    }
  }
);

const initialState: LogosState = {
  logos: [],
  loading: false,
  error: null,
};

const logosSlice = createSlice({
  name: 'logos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogos.fulfilled, (state, action: PayloadAction<CarLogo[]>) => {
        state.loading = false;
        state.logos = action.payload;
      })
      .addCase(fetchLogos.rejected, (state, action) => {
        state.loading = false;
        const errorMessage = action.payload?.message || action.error?.message || 'An unknown error occurred';
        state.error = errorMessage;
      });
  },
});

export default logosSlice.reducer;
