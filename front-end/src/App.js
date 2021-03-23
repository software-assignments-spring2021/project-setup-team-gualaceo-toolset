import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import landing from "./pages/landing";
import placeholder from "./pages/placeholder";
import home from "./pages/home";
import guest from "./pages/guest";
import groupmenu from "./pages/groupmenu";
import groupMenuGuest from "./pages/groupmenu_guest";
import generatedPlaylist from "./pages/generatedPlaylist";
import addMyMusic from "./pages/addMyMusic";
import members from "./pages/members.js";
import bannedMembers from "./pages/bannedMembers.js";
import generatedPlaylistGuest from "./pages/generatedPlaylistGuest";

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
          <Route exact path="/groupMenuGuest" component= {groupMenuGuest}/>
          <Route
            exact
            path="/generatedPlaylist"
            component={generatedPlaylist}
          />
          <Route exact path = "/generatedPlaylistGuest" component = {generatedPlaylistGuest} />
          <Route exact path="/addMyMusic" component={addMyMusic} />
          <Route exact path="/bannedMembers" component={bannedMembers} />
          <Route exact path="/members" component={members} />
        </Switch>
      </div>
    </Router>
  );
}
export default App;
