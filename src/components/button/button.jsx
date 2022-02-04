import React, { Component } from "react";
import s from "../../index.css"
export default class CreateButton extends Component {
  allUser = () => {
    this.props.allUser();
  };
 
 
  render() {
    const { activeTab } = this.props;
    return (
      <div className="button_container">
        <button onClick={this.allUser} disabled={activeTab}  className="tongle">
          all friends
        </button>
        <button onClick={this.allUser}disabled={!activeTab}  className="tongle">
          select friends
        </button>
      </div>
    );
  }
}
