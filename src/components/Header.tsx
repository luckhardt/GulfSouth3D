/*
Headercomponents.Can be used accross and renamed at will be used in the main App component. It contains the site header, including the logo and navigation links. The header is styled using CSS classes defined in the global.css file. The navigation links are currently placeholders and can be updated to point to the appropriate sections of the website.
*/

function Header() {
    return (
        <header className = "site-header">
            <div className = "container header-inner">
                <span className = "logo"> Digital Humanities at Southern Miss</span>
                <nav className = "main-nav">
                    <a href = "#">Home</a>
                    <a href = "#">Collection</a>
                    <a href = "#">Memorabilia</a>
                    <a href = "#">Historic Buildings</a>
                    <a href = "#">Public Art</a>
                    <a href = "#">About Us</a>
                </nav>
            </div>
        </header>
    );
}

export default Header;
