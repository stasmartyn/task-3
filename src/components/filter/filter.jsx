import React, { Component } from 'react';
import s from "../../index.css"
class Filter extends Component {
  setFilterValue = event => {
    let value = event.currentTarget.value.toLowerCase();
    this.props.setFilterToState(value);
  };

  render() {
    return (
      <div>
        <h4 className='input_title'>Find user by name</h4>
        <input onChange={this.setFilterValue} className='input' placeholder='search'></input>
      </div>
    );
  }
}


export default Filter;