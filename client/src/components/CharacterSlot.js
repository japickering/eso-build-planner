import React from "react";

const onMinusClick = (event) => {
  event.preventDefault();
  console.log("onMinusClick!");
};

const onPlusClick = (event) => {
  event.preventDefault();
  console.log("onPlusClick!");
};

const CharacterSlot = (props) => {
  return (
    <div className="card">
      {/* <img className="banner" src={props.banner} alt={props.alliance} /> */}
      <div className="card-header">
        <h3>{props.name}</h3>
        <h3>
          Level {props.level} {props.race} {props.classType}
        </h3>
      </div>
      <div className="card-body">
        Health:
        <div className="life-bar">
          <div className="inner">{props.health}</div>
        </div>
        <div className="attribute-buttons">
          <button className="btn" onClick={onMinusClick}>
            &minus;
          </button>
          <button className="btn" onClick={onPlusClick}>
            +
          </button>
        </div>
        Stamina:
        <div className="life-bar">
          <div className="inner">{props.stamina}</div>
        </div>
        Magicka:
        <div className="life-bar">
          <div className="inner">{props.magicka}</div>
        </div>
      </div>
      <div className="card-footer"></div>
    </div>
  );
};

export default CharacterSlot;
