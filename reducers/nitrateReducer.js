const initialState = {
  nitrateParams: [{value:30, data: '2 Sept 2023'}],
};

const nitrateReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PARAMETER':
      return {
        ...state,
        nitrateParams: [...state.nitrateParams, action.payload],
      };
    case 'EDIT_PARAMETER':
      return {
        ...state,
        nitrateParams: state.nitrateParams.map((parameter) =>
          parameter.id === action.payload.id ? action.payload : parameter
        ),
      };
    case 'DELETE_PARAMETER':
      return {
        ...state,
        nitrateParams: state.nitrateParams.filter(
          (parameter) => parameter.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

export default nitrateReducer;