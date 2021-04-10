import { Provider } from "react-redux";
import { useStore } from "../redux/store";
// styles
// import "../styles/globals.css";
// import "tailwindcss/tailwind.css";

import "../styles/tailwind.css"


const App = ({ Component, pageProps }) => {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
