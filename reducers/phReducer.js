const initialState = {
  waterParameters: [],
};

const phReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PARAMETER':
      return {
        ...state,
        waterParameters: [...state.waterParameters, action.payload],
      };
    case 'EDIT_PARAMETER':
      return {
        ...state,
        waterParameters: state.waterParameters.map((parameter) =>
          parameter.id === action.payload.id ? action.payload : parameter
        ),
      };
    case 'DELETE_PARAMETER':
      return {
        ...state,
        waterParameters: state.waterParameters.filter(
          (parameter) => parameter.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

export default phReducer;