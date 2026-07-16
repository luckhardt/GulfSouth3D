import { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import useScrollDirection from '../hooks/useScrollDirection';

function Header() {
    const hidden = useScrollDirection();
    const { pathname } = useLocation();
    const [searchOpen, setSearchOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    function handleNavClick(path: string) {
        if (pathname === path) {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setSearchOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className={`site-header ${hidden ? "header-hidden" : ""}`}>
            <div className="container header-inner">
                <Link className="logo" to="/">Digital Humanities at Southern Miss</Link>
                <nav className="main-nav">
                    <div className="nav-search" ref={searchRef}>
                        <button
                            className={`search-toggle ${searchOpen ? "search-toggle-hidden" : ""}`}
                            aria-label="Toggle search"
                            onClick={() => setSearchOpen(true)}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8"/>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                            </svg>
                        </button>
                        <input
                            type="text"
                            placeholder="Search the collection..."
                            className={`search-input-expand ${searchOpen ? "open" : ""}`}
                        />
                    </div>
                    <NavLink to="/" end onClick={() => handleNavClick("/")}>Home</NavLink>
                    <NavLink to="/stories" onClick={() => handleNavClick("/stories")}>Stories</NavLink>
                    <NavLink to="/collection" onClick={() => handleNavClick("/collection")}>Collection</NavLink>
                    <NavLink to="/map" onClick={() => handleNavClick("/map")}>Map</NavLink>
                    <NavLink to="/about" onClick={() => handleNavClick("/about")}>About</NavLink>
                </nav>
            </div>
        </header>
    );
}

export default Header;