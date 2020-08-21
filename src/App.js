import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import FaleMais from "./components/FaleMais";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={["/", "/fale-mais"]} component={FaleMais} />
      </Switch>
    </Router>
  );
}

export default App;
