import React, { Component } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: ""
  };

  componentDidMount = () => {
    this.fetchValues();
    this.fetchIndexes();
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("/api/values", {
      idx: this.state.index
    });

    this.fetchValues();
    this.fetchIndexes();
  };

  fetchValues = async () => {
    const values = await axios.get("/api/values/current");
    this.setState({ values: values.data });
  };

  fetchIndexes = async () => {
    const seenIndexes = await axios.get("/api/values/all");
    this.setState({ seenIndexes: seenIndexes.data });
  };

  renderSeenIndexes = () => {
    const indexes = this.state.seenIndexes;

    return indexes.map(({ number }) => number).join(", ");
  };

  renderCalculatedValues = () => {
    const entries = [];
    const values = this.state.values;

    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      );
    }

    return entries;
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="index">
            Enter your index:
            <input
              id="index"
              name="index"
              type="text"
              value={this.state.index}
              onChange={(e) => this.setState({ index: e.target.value })}
            />
          </label>
          <button>Submit</button>
        </form>

        <h3>Indexes I have seen: -</h3>

        <ul>{this.renderSeenIndexes()}</ul>

        <h3>Calculated values: -</h3>
        {this.renderCalculatedValues()}
      </div>
    );
  }
}

export default Fib;
