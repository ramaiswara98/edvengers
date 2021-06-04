import React from 'react'
import './header.css'
const Header = () => {

    const logOut = () =>{
        localStorage.clear();
        window.location.href='/';
        
    }
    function onCLikcNav(){
    var btns = this.getElementsByClassName("nav-item");
        for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
        window.location.href='/my-account';
        });
        }
    }
    return (
        <div className="header">
            <div className="left-nav">
                <p className="logoapp">EDvengers</p>
                <p className="nav-item" onClick={ ()=>window.location.href = '/' }>Home</p>
                <p className="nav-item " onClick={ ()=>window.location.href = '/my-class' }>My Class</p>
                <p className="nav-item" onClick={ ()=>window.location.href = '/my-account' }>My Account</p>
            </div>
            <div className="right-nav">
            <p className="nav-item" onClick={logOut} >Logout</p>
            </div>
           
            
        </div>
    )
}

export default Header
