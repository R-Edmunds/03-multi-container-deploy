import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Fib from "./Fib";
import OtherPage from "./OtherPage";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <h1>03-multi-container-deploy</h1>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/other-page">Other Page</Link>
            </li>
          </ul>
        </div>
        <div>
          <Route exact path="/" component={Fib} />
          <Route exact path="/other-page" component={OtherPage} />
        </div>
      </Router>
    );
  }
}

export default App;
