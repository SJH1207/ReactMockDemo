import React, { Component } from 'react'

export default class User extends Component {
   
   
    render() {
        const {name,age}=this.props
        console.log('User组件的props:',name,age);
       
        return (
            <div>
                <h1>hello 配置user页面</h1>
            </div>
        )
    }
}
