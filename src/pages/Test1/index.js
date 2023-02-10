import React, { Component } from 'react';
import User from './user';

export default class Test1 extends Component {
  render() {
    console.log('父组件的props', this.props);
    return (
      <div>
        <User name="lyl" age={18} />
      </div>
    );
  }
}
