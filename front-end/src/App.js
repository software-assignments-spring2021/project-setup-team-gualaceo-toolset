import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import landing from "./pages/landing";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={landing} />
        </Switch>
      </div>
    </Router>
  );
}
export default App;
