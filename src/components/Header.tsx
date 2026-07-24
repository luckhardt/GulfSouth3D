import { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import useScrollDirection from '../hooks/useScrollDirection';
import { getObjects } from '../api/omeka';
import type { HeritageObject } from '../types';
import AccessibilityMenu from './AccessibilityMenu';

function Header() {
    const hidden = useScrollDirection();
    const { pathname } = useLocation();
    const [searchOpen, setSearchOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [objects, setObjects] = useState<HeritageObject[]>([]);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        getObjects().then((data) => setObjects(data));
    }, []);

    // Close the search box when clicking outside it
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setSearchOpen(false);
                setQuery("");
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Close the mobile hamburger menu when clicking outside the header
    useEffect(() => {
        function handleClickOutsideMenu(event: MouseEvent) {
            if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
                setIsMobileMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutsideMenu);
        return () => document.removeEventListener("mousedown", handleClickOutsideMenu);
    }, []);

    const matches = query.trim() === ""
        ? []
        : objects.filter((object) =>
            object.title.toLowerCase().includes(query.toLowerCase())
         ).slice(0, 6);

    function handleNavClick(path: string) {
        if (pathname === path) {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
        setIsMobileMenuOpen(false);
    }

    return (
        <header className={`site-header ${hidden ? "header-hidden" : ""}`}>
            <div className="container header-inner" ref={headerRef}>
                <Link className="logo" to="/">Digital Humanities at Southern Miss</Link>

                <button
                    className="hamburger-toggle"
                    aria-label="Toggle menu"
                    onClick={() => setIsMobileMenuOpen((current) => !current)}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        {isMobileMenuOpen ? (
                            <path d="M18 6L6 18M6 6l12 12" />
                        ) : (
                            <path d="M3 6h18M3 12h18M3 18h18" />
                        )}
                    </svg>
                </button>

                <nav className={`main-nav ${isMobileMenuOpen ? "mobile-open" : ""}`}>
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
                            id="header-search"
                            name="header-search"
                            placeholder="Search the collection..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className={`search-input-expand ${searchOpen ? "open" : ""}`}
                        />
                        {query.trim() !== "" && matches.length > 0 && (
                            <div className="search-dropdown">
                                {matches.map((object) => (
                                    <Link
                                        key={object.id}
                                        to={`/collection/${object.slug}`}
                                        className="search-result"
                                        onClick={() => {
                                            setQuery("");
                                            setSearchOpen(false);
                                            setIsMobileMenuOpen(false);
                                        }}
                                    >
                                        {object.title}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                    <NavLink to="/" end onClick={() => handleNavClick("/")}>Home</NavLink>
                    <NavLink to="/stories" onClick={() => handleNavClick("/stories")}>Stories</NavLink>
                    <NavLink to="/collection" onClick={() => handleNavClick("/collection")}>Collection</NavLink>
                    <NavLink to="/map" onClick={() => handleNavClick("/map")}>Map</NavLink>
                    <NavLink to="/about" onClick={() => handleNavClick("/about")}>About</NavLink>
                    <AccessibilityMenu />
                </nav>
            </div>
        </header>
    );
}

export default Header;