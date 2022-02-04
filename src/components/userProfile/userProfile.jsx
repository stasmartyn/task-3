import React, { Component } from "react";
import style from "../../index.css";
export default class UserProfile extends Component {
  state = {};
  onSelectedId = (SelectedId) => {
    this.props.onSelectedId(SelectedId);
  };
  onDeleteId = (Id) => {
    this.props.onDeleteItem(Id);
  };
  onAdditionalInfo = (userName) => {
    this.props.onAdditionalInfo(userName);
  };
  createList = () => {
    return this.props.users.map((user) => {
      return (
        <li key={user.id} className={`${this.props.selectUser.select ? 'is-shown' : 'list-item'}`}>
          <div onClick={() => this.onAdditionalInfo(user.login)}   >
            <img src={user.avatar_url} alt={user.login} className="avatar" />
            <p className="name">{user.login}</p>
          </div>
          <ul className="button-list">
            <li className="button">
              <button
                className="delete_btn"
                onClick={() => this.onDeleteId(user.id)}
              >
                Delete
              </button>
            </li>
            <li className="button">
              <button
                className="select_btn"
                onClick={() => this.onSelectedId(user.id)}
              >
                add to selected
              </button>
            </li>
          </ul>
        </li>
      );
    });
  };
  render() {
    return <ul className="list">{this.createList()}</ul>;
  }
}
