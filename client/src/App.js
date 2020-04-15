import React, { Component } from "react";
import MUICard from "./components/MUICard";
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
    if (loading) return <div>Loading..</div>;

    return (
      <div className="App">
        <header className="App-header">
          <h1>ESO Character Build Planner</h1>
        </header>
        <div className="container">
          <h3>Results found..</h3>
          {this.state.response !== "" && (
            <MUICard {...this.state.response[0]} />
          )}
        </div>
      </div>
    );
  }
}
