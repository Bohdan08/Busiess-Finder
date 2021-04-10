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

    axios
      .get(
        `${endpoint}?offset=${
          offset || 0
        }${formattedLocation}${formattedTerm}${formattedText}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.API_KEY}`,
            crossdomain: true,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then(({ data }) => {
        console.log(data, "data");
        next({
          type: action.next.SUCCESS,
          payload: data.businesses,
          total: data.total,
        });
      })
      .catch((error) => {
        const { response } = error;
        next({
          type: action.next.ERROR,
          error: true,
          payload: {
            code: response ? response.status : "",
            message: response ? response.statusText : error.message,
          },
        });
      });
  } else {
    next(action);
  }
};

export default apiMiddleware;
