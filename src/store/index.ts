import { routerMiddleware } from "connected-react-router";
import { createHashHistory } from "history";
import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./reducers";
import thunk from "redux-thunk";

export const history = createHashHistory();

const store = createStore(
  rootReducer(history),
  compose(
    composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history)))
  )
);

export default store;
