import React, { Component } from 'react';
import '../App.css'
import logo from '../assets/header_logo.png'
export default class Header extends Component {

    render() {
        
        return (
            <div className="nav">
               <div className="logo"> <img src={logo} /> </div> 
               <div className="logoText"><b>Houser</b> Dashboard</div>
               <h3 className="logout">Logout</h3>
            </div>
        )
    }
}