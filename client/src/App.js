import React, { Component } from "react";
import "./App.css";

export default class App extends Component {
  state = {
    response: "",
  };

  componentDidMount() {
    this.load()
      .then((res) => this.setState({ response: JSON.parse(res) }))
      .catch((err) => console.log(err));
  }

  load = async () => {
    const response = await fetch("/load");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>ESO Character Build Planner</h1>
        </header>
        <div className="container">
          <h3>Characters found..</h3>
          {this.state.response !== "" && (
            <CharacterSlot {...this.state.response[0]} />
          )}
        </div>
      </div>
    );
  }
}

const CharacterSlot = (props) => {

  return (
    <div>
      <h3>
        {props.name} Level {props.level} {props.race} {props.classType}
      </h3>
      <img className="banner" src={props.banner} alt={props.alliance} />
      <p>Health: {props.health}</p>
      <p>Stamina: {props.stamina}</p>
      <p>Magicka: {props.magicka}</p>
    </div>
  );
};
