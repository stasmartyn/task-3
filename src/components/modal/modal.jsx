import React, { Component } from "react";
import s from "../../index.css";
import close from "../img/close.svg"
export default class Modal extends Component {
  toggleModal=()=>{
    this.props.toggleModal();
  }
  render() {
    const {user}=this.props;
    return (
      <div className="Modal_bacdrop">
        <div className="Modal_content">
        <button type="button" className="close" onClick={this.toggleModal}>
        <img src={close} className="close_icon" alt="React Logo" />            </button>
            <div className="flex_container">
              <img src={user.avatar_url} alt={user.login} className="avatar" />
              <ul className="modal_list">
                <li><p className="modal_descr">login:{`${user.login}`}</p></li>
                <li>
                  <p className="modal_descr">name:{`${user.name}`}</p>
                  <p className="modal_descr">location:{`${user.location}`}</p>
                </li>
                <li>
                  {" "}
                  <p className="modal_descr">folovers:{`${user.followers}`}</p>
                </li>
              </ul>
            </div>
        </div>
      </div>
    );
  }
}
