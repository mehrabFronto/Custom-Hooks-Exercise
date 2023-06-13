import { useEffect, useReducer } from "react";
import axios from "axios";

const initialState = {
   loading: false,
   error: null,
   data: null,
};

const actions = {
   fetchRequest: "FETCH_REQUEST",
   fetchSuccess: "FETCH_SUCCESS",
   fetchFailure: "FEATCH_FAILURE",
};

const reducer = (state, action) => {
   switch (action.type) {
      case actions.fetchRequest: {
         return { ...state, loading: true, error: null, data: null };
      }
      case actions.fetchSuccess: {
         return { ...state, loading: false, error: null, data: action.payload };
      }

      case actions.fetchFailure: {
         return { ...state, loading: false, error: action.payload, data: null };
      }
      default:
         return state;
   }
};

export const useFetch = (url) => {
   const [state, dispatch] = useReducer(reducer, initialState);
   //    const [loading, setLoading] = useState(false);
   //    const [error, setError] = useState(null);
   //    const [data, setData] = useState(null);
   useEffect(() => {
      dispatch({ type: actions.fetchRequest });

      axios
         .get(url)
         .then((res) => {
            dispatch({ type: actions.fetchSuccess, payload: res.data });
         })
         .catch((err) => {
            dispatch({ type: actions.fetchFailure, payload: err.message });
         });
   }, [url]);

   return state;
};
