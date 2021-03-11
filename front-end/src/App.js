import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import landing from "./pages/landing";
import placeholder from "./pages/placeholder";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={landing} />
          <Route exact path="/placeholder" component={placeholder} />
        </Switch>
      </div>
    </Router>
  );
}
export default App;
