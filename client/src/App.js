import React, { Component } from "react";
import Main from "./components/Main";
import "./App.css";

export default class App extends Component {
  state = {
    loading: true,
    response: "",
  };

  componentDidMount() {
    this.load()
      .then((res) =>
        this.setState({
          response: JSON.parse(res),
          loading: false,
        })
      )
      .catch((err) => console.log(err));
  }

  load = async () => {
    const response = await fetch("/load");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  render() {
    const { loading } = this.state;
    if (loading) return <div className="loading">Loading..</div>;

    return (
      <div className="App">
        <header className="App-header">
          <h1>ESO Character Build Planner</h1>
        </header>
        <div className="container">
          <p>Results found..</p>
          {this.state.response !== "" && <Main {...this.state.response[0]} />}
        </div>
      </div>
    );
  }
}
