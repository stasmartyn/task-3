import React, { Component } from "react";
import s from "../../index.css";
import Cat from "../cat";
export default class SelectList extends Component {
  onDeleteId = (Id) => {
    this.props.onDeleteItem(Id);
  };

  createList = () => {
    return this.props.select.map((user) => {
      return (
        <li key={user.id} className="list-item">
          <img src={user.avatar_url} alt={user.login} className="avatar" />
          <p className="name">{`${user.login}`}</p>
          <ul className="button-list_select">
            <li className="button_list">
              <button
                onClick={() => this.onDeleteId(user.id)}
                className="delete_btn button_select_list"
              >
                Delete
              </button>
            </li>
          </ul>
        </li>
      );
    });
  };
 
  render() {
    return(
    <div>
      <ul className="list">{this.createList()}</ul>;
      { !this.props.select.length &&(<Cat />)}
    </div>);
  }
}
