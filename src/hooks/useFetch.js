import React from 'react';

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
  const fetchFnRef = React.useRef();
  fetchFnRef.current = fetchFn;

  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    dispatch({ type: 'queried' });

    const fetch = async () => {
      try {
        const data = await fetchFnRef.current();
        dispatch({ type: 'succeeded', payload: data });
      } catch (e) {
        dispatch({ type: 'failed', payload: e });
      }
    };

    fetch();
  }, [fetchFnRef]);

  return state;
}
