import React,{useState} from "react";
import { HeaderDiv } from "./elements";
import cartImg from './images/carts.png';
import {Link} from 'react-router-dom';

const Header =({cartcallback,cart})=>{
    
    return (
        <HeaderDiv>
        <div className="jumbotron">
            <div className="container text-center">
                <h1>Online Store</h1>      
                <p>Mission, Vission & Values</p>
            </div>
        </div>
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>                        
                </button>
                <a className="navbar-brand" href="#">Logo</a>
                </div>
                <div className="collapse navbar-collapse" id="myNavbar">
                <ul className="nav navbar-nav">
                    <li className="active"><Link to="/" >Shop</Link></li>
                    <li><a href="#">Products</a></li>
                    <li><a href="#">Deals</a></li>
                    <li><a href="#">Stores</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                    <li><a href="#">Your Account</a></li>
                    <li><Link to="/cart" ><img src={cartImg} className="shopping-cart-img"/> Cart <span className="cart-count">{cart.cart}</span></Link></li>
                </ul>
                </div>
            </div>
            </nav>
        </HeaderDiv>
    )
}
export default Header;