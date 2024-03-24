import React from 'react'
import './nav.css';
import { Link } from 'react-router-dom';


const Nav = () => {
    return (
        <nav>
            <div>Logo</div>
            <ul>
                <li><Link to="home">Home</Link></li>
                <li><Link to={"/"}>Services</Link></li>
                <li><Link to={"/"}>Gallery</Link></li>
                <li><Link to={"/"}>Contact Us</Link></li>
            </ul>
        </nav>
    )
}

export default Nav