import React, { Component } from "react";
export default class CreateButton extends Component {
  allUser = () => {
    this.props.allUser();
  };
  render() {
    const { aktiveTab } = this.props;
    return (
      <div className="button_container">
        <button onClick={this.allUser} disabled={aktiveTab}  className="tongle">
          all friends
        </button>
        <button onClick={this.allUser} disabled={!aktiveTab} className="tongle">
          select friends
        </button>
      </div>
    );
  }
}
