import React, { useReducer } from 'react';
import techContext from './techContext';
import techReducer from './techReducer';

import { GET_TECHS, ADD_TECH, DELETE_TECH, TECHS_ERROR } from '../types';

const TechState = props => {
  const initialState = {
    techs: [],
    loading: true,
    error: null
  };

  const [state, dispatch] = useReducer(techReducer, initialState);

  return (
    <techContext.Provider
      value={{
        techs: state.techs,
        loading: state.loading,
        error: state.error
      }}
    >
      {props.children}
    </techContext.Provider>
  );
};

export default TechState;
