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

  // Get techs
  const getTechs = async () => {
    try {
      const res = await fetch('/techs');
      const data = await res.json();

      dispatch({
        type: GET_TECHS,
        payload: data
      });
    } catch (err) {
      dispatch({
        type: TECHS_ERROR,
        payload: err.response.data
      });
    }
  };

  // Add techs
  const addTech = async tech => {
    try {
      const res = await fetch('/techs', {
        method: 'POST',
        body: JSON.stringify(tech),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();

      dispatch({
        type: ADD_TECH,
        payload: data
      });
    } catch (err) {
      dispatch({
        type: TECHS_ERROR,
        payload: err.response.data
      });
    }
  };

  // Delete Tech
  const deleteTech = async id => {
    try {
      await fetch(`/techs/${id}`, { method: 'DELETE' });

      dispatch({
        type: DELETE_TECH,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: TECHS_ERROR,
        payload: err.response.data
      });
    }
  };

  return (
    <techContext.Provider
      value={{
        techs: state.techs,
        loading: state.loading,
        error: state.error,
        getTechs,
        addTech,
        deleteTech
      }}
    >
      {props.children}
    </techContext.Provider>
  );
};

export default TechState;
