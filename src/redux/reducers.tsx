// reducers.js
const initialState = {
  data: null,
};

const rootReducer = (state = initialState, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case 'ADD_DATA':
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
