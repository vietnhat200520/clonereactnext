import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '@/types/types';

interface CategoryState {
  categoriesData: Category[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CategoryState = {
  categoriesData: [],
  status: 'idle',
  error: null,
};


export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/api/schools');
      if (!response.ok) {
        throw new Error('Lỗi mạng hoặc server không phản hồi');
      }
      const data = await response.json();
      return data as Category[];
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categoriesData = action.payload;
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categoriesData = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;