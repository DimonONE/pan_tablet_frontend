import ReactDOM from "react-dom";
import "./index.scss";
import { Provider } from "react-redux";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import store, { history } from "./store";
import { ConnectedRouter } from "connected-react-router";
import RouteChangeTracker from "./RouteChangeTracker";
import ReactGA from "react-ga";

const TRACKING_ID = "G-29M0XH446J"; // YOUR_OWN_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
      <RouteChangeTracker />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
