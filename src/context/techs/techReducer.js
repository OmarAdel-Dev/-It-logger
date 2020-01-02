import { GET_TECHS, ADD_TECH, DELETE_TECH, TECHS_ERROR } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_TECHS:
      return {
        ...state,
        techs: action.payload,
        loading: false
      };
    case ADD_TECH:
      return {
        ...state,
        techs: [...state.techs, action.payload],
        loading: false
      };
    case DELETE_TECH:
      return {
        ...state,
        techs: state.techs.filter(tech => tech.id !== action.payload),
        loading: false
      };
    case TECHS_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
