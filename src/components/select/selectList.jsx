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
          {`${user.login}`}
          <ul className="button-list">
            <li className="button">
              <button
                onClick={() => this.onDeleteId(user.id)}
                className="delete_btn"
              >
                Delete
              </button>
            </li>
          </ul>
        </li>
      );
    });
  };
  sadCat=()=>{
    if(this.state.selectedUsers.length<1){
        this.setState(({ sadcat }) => ({
            sadcat: !sadcat,
          }));
      }      
  }
  render() {
    return(
    <div>
      <ul className="list">{this.createList()}</ul>;
      { this.props.sadcat &&(<Cat />)}
    </div>);
  }
}
