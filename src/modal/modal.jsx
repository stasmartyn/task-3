import React, { Component } from "react";
import s from "../index.css";

export default class Modal extends Component {
  render() {
    return (
      <div className="Modal_bacdrop">
        <div className="Modal_content">{this.props.children}</div>
      </div>
    );
  }
}
