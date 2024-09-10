
import { ADD_COURSE, REMOVE_COURSE } from "../actions/ChosenActions";

const initialState = {
  data: []
};

const chosenReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COURSE:
      return {
        ...state,
        data: [...state.data, action.payload] 
      };
    case REMOVE_COURSE:
      console.log(action.payload.crn)
      return {
        ...state,
        data: state.data.filter((course) => course.crn !== action.payload.crn) 
      };
    default:
      return state;
  }
};

export default chosenReducer;
