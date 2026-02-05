import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ICourse } from '@/types/types';


interface CourseState {
  courses: ICourse[];       
  currentCourse: ICourse | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CourseState = {
  courses: [],
  currentCourse: null,
  status: 'idle',
  error: null,
};


export const fetchCourseDetail = createAsyncThunk(
  'course/fetchCourseDetail',
  async (slug: string, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/api/cards');
      if (!response.ok) {
        throw new Error('Không thể tải dữ liệu từ server');
      }
      const data: ICourse[] = await response.json();
      
      
      const foundCourse = data.find((course) => course.slug === slug);
      
      if (!foundCourse) {
        return rejectWithValue('Không tìm thấy khóa học này');
      }
      
      return foundCourse;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);


export const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    // Action để clear khóa học hiện tại khi thoát trang
    clearCurrentCourse: (state) => {
      state.currentCourse = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourseDetail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCourseDetail.fulfilled, (state, action: PayloadAction<ICourse>) => {
        state.status = 'succeeded';
        state.currentCourse = action.payload;
      })
      .addCase(fetchCourseDetail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentCourse } = courseSlice.actions;
export default courseSlice.reducer;