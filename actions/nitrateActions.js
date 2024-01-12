const ADD_PARAM = 'ADD_PARAM';
const REMOVE_PARAM = 'REMOVE_PARAM';
const UPDATE_PARAM = 'UPDATE_PARAM';

function addParam(param) {
  return {
    type: ADD_PARAM,
    param
  };
}

function removeParam(param) {
  return {
    type: REMOVE_PARAM,
    param
  };
}

function updateParam(param) {
  return {
    type: UPDATE_PARAM,
    param
  };
}

const actionCreators = {
  addParam,
  removeParam,
  updateParam
};

export { actionCreators }