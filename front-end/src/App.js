import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import landing from "./pages/landing";
import placeholder from "./pages/placeholder";
import home from "./pages/home";
import guest from "./pages/guest";
import groupmenu from "./pages/groupmenu";
import playlist from "./pages/playlist";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={landing} />
          <Route exact path="/placeholder" component={placeholder} />
          <Route exact path="/home" component={home} />
          <Route exact path="/guest" component={guest} />
          <Route exact path="/groupmenu" component={groupmenu} />
          <Route exact path="/playlist" component={playlist} />
        </Switch>
      </div>
    </Router>
  );
}
export default App;
