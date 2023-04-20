import { Link } from 'react-router-dom';
import './styles/navigation.css';

export default function Navigation() { 
    return(
        <nav className = "nav-bar">
            <ul>
                <li>
        
                    <Link to = "/">Home</Link>
                </li>
                <li>
                    <Link to = "/BusinessCard">Business Card</Link>
                </li>
                <li>
                    <Link to = "/about">About</Link>
                </li>
                <li>
                    <Link to = "/contact">Contact</Link>
                </li>
            </ul>
        </nav>
    )
}

