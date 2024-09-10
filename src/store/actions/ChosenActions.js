
export const ADD_COURSE = "ADD_COURSE";
export const REMOVE_COURSE = "REMOVE_COURSE";

export const addCourse = (data) => ({
    type: ADD_COURSE,
    payload: data,
  });
  
  export const removeCourse = (data) => ({
    type: REMOVE_COURSE,
    payload: data,
  });
  

  