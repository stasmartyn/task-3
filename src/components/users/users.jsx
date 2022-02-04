import React, { Component } from "react";
import UserProfile from "../userProfile/userProfile";
import SelectUsers from "../select/selectList";
import Modal from "../modal/modal";
import s from "../../index.css";
import Filter from "../filter/filter";
import Button from "../button/button";
import Footer from "../footer/footer";
import Header from "../header/header";
import userAPI from "../api/api";
import listUserAPI from "../api/usersAPI";
import Cat from "../cat";
export default class User extends Component {
  state = {
    users: [],
    filter: "",
    selectedUsers: [],
    showModal: false,
    activeTab: true,
    user:[]
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  componentDidMount() {
    if(this.state.user.length<1){
      listUserAPI.usersData().then((usersList) => {
        this.setState({users:usersList})
      })
    }
    const saveSelect = localStorage.getItem("selectUsers");
  const parseUser = JSON.parse(saveSelect);
  if (parseUser !== null) {
    this.setState({ selectedUsers: parseUser });
  
  }


  }
  
  componentDidUpdate(prevProps, prevState){
    if (this.state.selectedUsers !== prevState.selectedUsers){
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
    let index = this.state.users.findIndex((user) => user.id === selectedId);
    let users = [...this.state.selectedUsers];
    let allUsers = [...this.state.users];
    let user = allUsers[index];
    allUsers[index].selected = !allUsers[index].selected ? true : false;
    this.setState({ users: allUsers });
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
  };
  additionalInfo=(userName)=>{
    userAPI.additionalInfo(userName).then((user) => {
      this.setState({ user: user });
      setTimeout(() => {
        this.toggleModal();
      });
    }, 200);
  
  this.setState({ user: [] });
   
  }
  
  
  allUser = () => {
    this.setState(({ activeTab }) => ({
      activeTab: !activeTab,
    }));
  };
  deleteSelectUser = (id) => {
    this.setState((prevState) => ({
      selectedUsers: prevState.selectedUsers.filter((user) => user.id !== id),
    }));
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
  

  render() {
    const { users, selectedUsers, showModal, user, activeTab, sadCat, } =
      this.state;


    return (
      <section className="section">
        <Header />
        
        <div className="side">
          <Filter setFilterToState={this.setFilterToState} />
          <Button activeTab={activeTab} allUser={this.allUser} selectUser={this.selectUser} />
        </div>
        {activeTab && (
          <UserProfile
            users={this.filterArr(users)}
            onDeleteItem={this.deleteItem}
            onSelectedId={this.selected}
            onAdditionalInfo={this.additionalInfo}
            selectUser={selectedUsers}
          />
        )}
        {!activeTab && (
          <SelectUsers
            select={selectedUsers}
            onDeleteItem={this.deleteSelectUser}
            sadCat={sadCat}
          />
        )}
        <Footer />
        {showModal && (
          <Modal user={user} toggleModal={this.toggleModal}/>
        
        )}
      </section>
    );
  }
}
