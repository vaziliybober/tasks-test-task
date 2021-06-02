import React, { useState } from 'react';

const initialState = {
  isSuccess: false,
  isLoading: true,
  isError: false,
  status: 'loading',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'queried':
      return initialState;
    case 'succeeded':
      return {
        isSuccess: true,
        data: action.payload,
        isLoading: false,
        isError: false,
        status: 'success',
      };
    case 'failed':
      return {
        isSuccess: false,
        isLoading: false,
        isError: true,
        error: action.payload,
        status: 'error',
      };
    default:
      return state;
  }
};

export default function useFetch(fetchFn) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(async () => {
    dispatch({ type: 'queried' });

    try {
      const data = await fetchFn();
      dispatch({ type: 'succeeded', payload: data });
    } catch (e) {
      dispatch({ type: 'failed', payload: e });
    }
  }, []);

  return state;
}
