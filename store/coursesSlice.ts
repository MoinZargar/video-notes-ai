import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Course } from '@prisma/client';

interface CoursesState {
  courses: Course[];
}

const initialState: CoursesState = {
  courses: [],
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload;
    },
    
    addCourse: (state, action: PayloadAction<Course>) => {
      state.courses.push(action.payload);
    },
  },
});

export const { setCourses, addCourse } = coursesSlice.actions;
export default coursesSlice.reducer;