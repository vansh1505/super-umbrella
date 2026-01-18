import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

// FIXED CASE-SENSITIVE IMPORTS
import { tiles } from "./components/Data";

// Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Response from "./components/Response";
import Map from "./components/Map";
import Tileview from "./components/Tileview";
import About from "./components/About";
import HowTo from "./components/Howto";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tiles: tiles,
      controlbar: {
        all: true,
        people: false,
        car: false,
        electrical: false,
        shelter: false,
        tree: false,
        water: false
      },
      showPopUp: false,
      type: ""
    };
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Hero} />
            <Route path="/map" component={Map} />
            <Route
              path="/response"
              component={props => (
                <Response
                  originalData={tiles}
                  tiles={this.state.tiles}
                  controlbar={this.state.controlbar}
                  showPopUp={this.state.showPopUp}
                  type={this.state.type}
                  update={(tls, bar) => {
                    this.setState({ ...this.state, tiles: tls });
                  }}
                  updateControlBar={bar => {
                    this.setState({ ...this.state, controlbar: bar });
                  }}
                  togglePopUp={() => {
                    this.setState({ showPopUp: !this.state.showPopUp });
                  }}
                  updateType={typ => {
                    this.setState({ type: typ });
                  }}
                />
              )}
            />
            <Route path="/howto" component={HowTo} />
            <Route path="/about" component={About} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;