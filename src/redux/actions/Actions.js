// actions.js
export const fetchDataSuccess = (data) => {
  return { type: "FETCH_DATA_SUCCESS", payload: data };
};

export const fetchDataFailure = (error) => {
  return { type: "FETCH_DATA_FAILURE", payload: error };
};
