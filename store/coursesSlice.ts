import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SerializedCourse } from '@/types/course';

interface CoursesState {
  courses: SerializedCourse[];
}

const initialState: CoursesState = {
  courses: [],
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    
    setCourses: (state, action: PayloadAction<SerializedCourse[]>) => {
      state.courses = action.payload;
    },
    
    addCourse: (state, action: PayloadAction<SerializedCourse>) => {
      state.courses.push(action.payload);
    },
  },
});

export const { setCourses, addCourse } = coursesSlice.actions;
export default coursesSlice.reducer;