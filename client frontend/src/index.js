/* import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
 import { Provider } from "react-redux";
 import store from "./store/store.ts";

ReactDOM.render(<App />, document.getElementById("root"));
  */
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
/* import * as serviceWorker from "./serviceWorkerRegistration";
 */ import store from "./store/store.ts";
// for translation
/* import "./locales/config";
 */

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
