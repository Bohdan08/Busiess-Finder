import axios from "axios";
import { API_REQUEST } from "../constants/actionTypes";

// export const LINK = `${"https://cors-anywhere.herokuapp.com/"}https://api.yelp.com/v3/businesses/search`;

const apiMiddleware = (store) => (next) => (action) => {
  const { type, payload } = action;

  if (type === API_REQUEST) {
    const { location, term, offset } = payload;
    next({
      type: action.next.PENDING,
    });

    // term is optional
    const formattedTerm = term ? `&term=${term}` : "";

    axios
      .get(
        `${process.env.MAIN_END_POINT}?location=${location}${formattedTerm}&offset=${offset}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.API_KEY}`,
          },
        }
      )
      .then(({ data }) => {
        next({
          type: action.next.SUCCESS,
          payload: data.businesses,
          total: data.total,
        });
      })
      .catch((error) => {
        next({
          type: action.next.ERROR,
          error: true,
          payload: error.message,
        });
      });
  } else {
    next(action);
  }
};

export default apiMiddleware;
