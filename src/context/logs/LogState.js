import React, { useReducer } from 'react';
import LogContext from './logContext';
import LogReducer from './logReducer';

import {
  GET_LOGS,
  ADD_LOG,
  DELETE_LOG,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_LOG,
  CLEAR_LOGS,
  SET_LOADING,
  LOGS_ERROR,
  SEARCH_LOGS
} from '../types';

const LogState = props => {
  const initialState = {
    logs: [],
    current: null,
    loading: true,
    error: null
  };

  const [state, dispatch] = useReducer(LogReducer, initialState);

  // get logs
  const getLogs = async () => {
    try {
      const res = await fetch('/logs');
      const data = await res.json();

      dispatch({
        type: GET_LOGS,
        payload: data
      });
    } catch (err) {
      dispatch({
        type: LOGS_ERROR,
        payload: err.response.data
      });
    }
  };

  //Add logs

  const addLog = async log => {
    try {
      const res = await fetch('/logs', {
        method: 'POST',
        body: JSON.stringify(log),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();

      dispatch({
        type: ADD_LOG,
        payload: data
      });
    } catch (err) {
      dispatch({
        type: LOGS_ERROR,
        payload: err.response.data
      });
    }
  };

  //Delete logs

  const deleteLog = async id => {
    try {
      await fetch(`/logs/${id}`, { method: 'DELETE' });

      dispatch({
        type: DELETE_LOG,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: LOGS_ERROR,
        payload: err.response.data
      });
    }
  };

  // Set current
  const setCurrent = log => {
    dispatch({ type: SET_CURRENT, payload: log });
  };

  // Clear current
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  //Update logs
  const updateLog = async log => {
    try {
      const res = await fetch(`/logs/${log.id}`, {
        method: 'PUT',
        body: JSON.stringify(log),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();

      dispatch({
        type: UPDATE_LOG,
        payload: data
      });
    } catch (err) {
      dispatch({
        type: LOGS_ERROR,
        payload: err.response.data
      });
    }
  };

  // Search logs

  const searchLogs = async text => {
    try {
      const res = await fetch(`/logs?q=${text}`);
      const data = await res.json();

      dispatch({
        type: SEARCH_LOGS,
        payload: data
      });
    } catch (err) {
      dispatch({
        type: LOGS_ERROR,
        payload: err.response.data
      });
    }
  };

  return (
    <LogContext.Provider
      value={{
        logs: state.logs,
        current: state.current,
        loading: state.loading,
        error: state.error,
        getLogs,
        addLog,
        deleteLog,
        setCurrent,
        clearCurrent,
        updateLog,
        searchLogs
      }}
    >
      {props.children}
    </LogContext.Provider>
  );
};

export default LogState;
