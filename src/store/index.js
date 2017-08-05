import { createStore, applyMiddleware} from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import reducers from "../reducers/index";

const store = createStore(
    reducers,
    applyMiddleware(createLogger(), thunk, promise())
);

export default store;