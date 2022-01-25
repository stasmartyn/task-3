import React, { Component } from 'react';

class Filter extends Component {
  setFilterValue = event => {
    let value = event.currentTarget.value.toLowerCase();
    this.props.setFilterToState(value);
  };

  render() {
    return (
      <div>
        <h4>Find user by name</h4>
        <input onChange={this.setFilterValue} className='input'></input>
      </div>
    );
  }
}


export default Filter;