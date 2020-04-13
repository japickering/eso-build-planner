import React, { Component } from "react";

export default class Card extends Component {
  state = {
    name: this.props.name,
    level: this.props.level,
    classType: this.props.classType,
    race: this.props.race,
    attributePoints: this.props.attributePoints,
    health: this.props.health,
    stamina: this.props.stamina,
    magicka: this.props.magicka,
  };

  onReduceHP = () => {
    if (Number(this.state.health) > 0) {
      this.setState({
        health: String(Number(this.state.health) - 1),
        attributePoints: String(Number(this.state.attributePoints) + 1),
      });
    } else {
      return;
    }
  };

  onIncreaseHP = () => {
    const max = 64;
    if (this.state.health < max) {
      this.setState({
        health: String(Number(this.state.health) + 1),
        attributePoints: String(Number(this.state.attributePoints) - 1),
      });
    } else {
      return;
    }
  };

  onResetHP = () => {
    const max = 64;
    if (this.state.health > 0) {
      this.setState({
        health: "0",
        attributePoints: String(max),
      });
    } else {
      return;
    }
  };

  onAssignAllHP = () => {
    const max = 64;
    if (this.state.health < max && this.state.attributePoints == max) {
      this.setState({
        health: String(max),
        attributePoints: "0",
      });
    } else {
      return;
    }
  };

  render() {
    return (
      <div className="card">
        <div className="card-header">
          <h3>
            {this.state.name}, Level {this.state.level} {this.state.race}{" "}
            {this.state.classType}
          </h3>
        </div>

        <div className="card-body">
          <p>Attribute points: {this.state.attributePoints}</p>
          <div className="attribute-buttons">
            <button className="btn" onClick={this.onReduceHP}>
              &minus;
            </button>
            <button className="btn" onClick={this.onIncreaseHP}>
              +
            </button>
          </div>
          Health
          <div className="life-bar">
            <div className={`bar size-${this.state.health}`}>
              {this.state.health}
            </div>
          </div>
          {/* Stamina:
          <div className="life-bar">
            <div className={`bar size-${this.state.stamina}`}>
              {this.state.stamina}
            </div>
          </div>
          Magicka:
          <div className="life-bar">
            <div className={`bar size-${this.state.magicka}`}>
              {this.state.magicka}
            </div>
          </div> */}
        </div>

        <div className="card-actions">
          <button className="btn block danger" onClick={this.onResetHP}>
            &minus; Reset health
          </button>
          <button className="btn block" onClick={this.onAssignAllHP}>
            + Assign all to health
          </button>
        </div>
      </div>
    );
  }
}
