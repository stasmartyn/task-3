import React, { Component } from "react";
import UserProfile from "../userProfile/userProfile";
import SelectUsers from "../select/selectList";
import Modal from "../../modal/modal";
import s from "../../index.css";
import Filter from "../filter/filter";
import Button from "../button/button";
import Footer from "../../footer/footer";
import Heder from "../heder/heder";
import Cat from "../cat";
export default class User extends Component {
  state = {
    users: [],
    filter: "",
    selectedUsers: [],
    showModal: false,
    aktiveTab: true,
    sadcat:false,
  };
  togleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  componentDidMount() {
    console.log("component did mount");
    this.sadCat()

    fetch(`https://api.github.com/users`)
      .then((response) => response.json())
      .then((usersList) => {
        this.setState({ users: usersList });
      });
    const saveSelect = localStorage.getItem("selectUsers");
    const parseUser = JSON.parse(saveSelect);
    if (parseUser !== null) {
      this.setState({ selectedUsers: parseUser });
    }
    
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedUsers !== prevState.selectedUsers) {
      localStorage.setItem(
        "selectUsers",
        JSON.stringify(this.state.selectedUsers)
      );
    }
  }
  deleteItem = (Id) => {
    this.setState((prevState) => ({
      users: prevState.users.filter((user) => user.id !== Id),
    }));
  };
  selected = (selectedId) => {
    let user = this.state.users.find((user) => user.id === selectedId);
    let users = [...this.state.selectedUsers];
    if (!users.includes(user)) {
      users.push(user);

      this.setState({
        selectedUsers: users,
      });
      localStorage.setItem(
        "selectUser",
        JSON.stringify(this.state.selectedUsers)
      );
    }
    this.sadCat();
  };

  AdditionalInfo = (userName) => {
    fetch(`https://api.github.com/users/${userName}`)
      .then((response) => response.json())
      .then((user) => {
        this.setState({ user: user });
        setTimeout(() => {
          this.togleModal();
        });
      }, 200);

    this.setState({ user: [] });
  };
  allUser = () => {
    this.setState(({ aktiveTab }) => ({
      aktiveTab: !aktiveTab,
    }));
  };
  deleteSelectUser = (id) => {
    this.setState((prevState) => ({
      selectedUsers: prevState.selectedUsers.filter((user) => user.id !== id),
    }));
    this.sadCat()
  };
  setFilterToState = (filterData) => {
    this.setState({ ...this.state, filter: `${filterData}` });
  };
  filterArr = (fArr) => {
    let newArr = fArr.filter((cur) =>
      cur.login.toLowerCase().includes(this.state.filter)
    );
    return newArr;
  };
  sadCat=()=>{
    if(this.state.selectedUsers.length<1){
        this.setState(({ sadcat }) => ({
            sadcat: !sadcat,
          }));
      }      
  }
  render() {
    const { users, selectedUsers, showModal, user, aktiveTab,sadcat } = this.state;

    console.log("render");

    return (
      <section className="section">
          <Heder/>
        <div className="side">
          <Filter setFilterToState={this.setFilterToState} />
          <Button  aktiveTab={aktiveTab} allUser={this.allUser} />
        </div>
        {aktiveTab && (
          <UserProfile
            users={this.filterArr(users)}
            onDeleteItem={this.deleteItem}
            onSelectedId={this.selected}
            onAdditionalInfo={this.AdditionalInfo}
          />
        )}
        {!aktiveTab && (
          <SelectUsers
            select={selectedUsers}
            onDeleteItem={this.deleteSelectUser}
            sadcat={sadcat}
          />
              
        )}
        <Footer/>
        {showModal && (
          <Modal>
            <button type="button" onClick={this.togleModal}>
              close
            </button>
            <div>
              <img src={user.avatar_url} alt={user.login} className="avatar" />
              <ul className="modal_list">
                <li>{`${user.login}`}</li>
                <li>
                  <p>{`${user.name}`}</p>
                  <p>{`${user.location}`}</p>
                </li>
                <li>
                  {" "}
                  <p>{`${user.followers}`}</p>
                </li>
              </ul>
            </div>
          </Modal>
        )}

      </section>
    );
  }
}
