import React, { Component } from "react";

class ListGroup extends Component {
  state = {};
  render() {
    return (
      <ul className="list-group">
        {this.props.items.map(item => (
          <li
            key={item._id}
            style={{ cursor: "pointer" }}
            className="list-group-item"
            onClick={() => this.props.onItemSelect(item)}
          >
            {item.name}
            {this.props.currentGenre._id === item._id
              ? <i className="fa fa-check fa-lg pull-right" style={{color:"#007BFF"}} aria-hidden="true"></i>
              : ""}
          </li>
        ))}
      </ul>
    );
  }
}

export default ListGroup;
