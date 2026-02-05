import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '@/types/types';
import { categoriesData } from '@/data'; 

interface CategoryState {
  categoriesData: Category[];
}

const initialState: CategoryState = {
  categoriesData: categoriesData,
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categoriesData = action.payload;
    },
  },
});

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;