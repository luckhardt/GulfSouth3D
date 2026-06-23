/*
Header components can be used across and renamed at will be used in the main App component. It contains the site header, including the logo and navigation links. The header is styled using CSS classes defined in the global.css file. The navigation links are currently placeholders and can be updated to point to the appropriate sections of the website.
*/
import { Link } from 'react-router-dom'; // Import the Link component from react-router-dom for navigation

function Header() {
    return (
        <header className = "site-header">
            <div className = "container header-inner">
                <Link className = "logo" to="/">Digital Humanities at Southern Miss</Link>
                <nav className = "main-nav">
                    <Link to="/">Home</Link> 
                    <Link to="/stories">Stories</Link>
                    <Link to="/collection">Collection</Link>
                    <Link to="/map">Map</Link>
                    <Link to="/about">About</Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;
