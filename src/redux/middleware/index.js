import axios from "axios";
import { API_REQUEST } from "../constants/actionTypes";

const apiMiddleware = (store) => (next) => (action) => {
  const { type, payload } = action;

  if (type === API_REQUEST) {
    const { location, term, offset, endpoint, text } = payload;
    next({
      type: action.next.PENDING,
    });

    // send values if they exist
    const formattedTerm = term ? `&term=${term}` : "";
    const formattedText = text ? `&text=${text}` : "";
    const formattedLocation = location ? `&location=${location}` : "";
    // check if offset explicitly undefined cuz it might be 0

    axios
      .get(
        `${endpoint}?offset=${
          offset || 0
        }${formattedLocation}${formattedTerm}${formattedText}`,
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
