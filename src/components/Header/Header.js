import React from 'react';
import logo from '../../images/logo3.png';
import './Header.css';

 

const Header = () => {
    return (
        <div className ="header">
            <img src={logo} alt="" srcset="" />
            <nav>
                <a href="/shop">Shop</a>
                <a href="/reviews">Order Review</a>
                <a href="/manage">Manage Inventory</a>
            </nav>
            
        </div>
    );
};

export default Header;