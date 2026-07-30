import { Link } from "react-router-dom";
function Footer() {
    return (
        <footer className="site-footer">
            <div className="container footer-inner">
                <div className="footer-about">
                    <h3 className="footer-title">Digitizing the Cultural Heritage<br />of South Mississippi</h3>
                    <p>A 3D Digital Archive of Artifacts, Buildings,and Public Art From the Gulf Coast, Piney Woods,  and Natchez Regions. </p>
                    <div className="footer-social" aria-label="Social media links">
                        <a href="https://www.instagram.com/dhatsouthernmiss/" className="social-instagram" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                        </a>
                        <a href="https://www.facebook.com/DHatUSM/" className="social-facebook" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 1.913-.287 1.754h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.628-5.373-12-12-12s-12 5.372-12 12c0 6.135 4.604 11.194 10.101 11.647z"/>
                            </svg>
                        </a>
                        <a href="https://www.threads.com/@dhatsouthernmiss" className="social-threads" target="_blank" rel="noopener noreferrer" aria-label="Threads">
                            <svg width="20" height="20" viewBox="0 0 192 192" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.395 132.296C133.574 125.696 136.87 117.143 138.336 106.366C144.365 110.02 148.836 114.828 151.3 120.63C155.484 130.469 155.727 146.679 142.517 159.877C130.947 171.437 117.089 176.463 96.9631 176.61C74.6516 176.443 57.7538 169.246 45.7381 154.859C34.4877 141.375 28.6763 122.407 28.4534 96.0002C28.6763 69.5931 34.4877 50.6249 45.7381 37.1409C57.7538 22.7538 74.6516 15.5567 96.9631 15.3897C119.437 15.5581 136.628 22.7889 148.06 37.3524C153.664 44.5054 157.884 53.4501 160.673 63.9384L177.031 59.6613C173.685 46.9738 168.315 36.0181 160.938 26.6062C146.386 8.05605 125.078 -1.42214 97.5619 -1.61212C70.2065 -1.42214 49.1211 8.09202 34.9448 27.0139C22.3452 43.7783 15.8551 66.9411 15.5698 95.9628L15.5695 96.0002L15.5698 96.0377C15.8551 125.059 22.3452 148.222 34.9448 164.986C49.1211 183.908 70.2065 193.422 97.5619 193.612C121.965 193.44 138.867 187.107 152.842 173.174C171.148 154.958 170.605 132.202 164.437 118.437C160.011 108.578 151.622 100.601 141.537 88.9883Z"/>
                            </svg>
                        </a>
                        <a href="https://www.youtube.com/@CDHatUSM" className="social-youtube" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                        </a>
                    </div>
                </div>

                <div className="footer-links">
                    <h4>Explore</h4>
                    <nav aria-label="Footer">

                    <Link to="/">Home</Link>
                    <Link to="/stories">Stories</Link>
                    <Link to="/collection">Collection</Link>
                    <Link to="/map">Map</Link>
                    <Link to="/about">About</Link>

                    </nav>
                </div>

                <div className="footer-contact">
                    <h4>Contact</h4>
                    <p>
                        Center for Digital Humanities<br />
                        University of Southern Mississippi<br />
                        118 College Drive, #5047<br />
                        Hattiesburg, MS 39406
                    </p>
                </div>

            </div>

            <div className="container footer-bottom">
                <span>© 2026 University of Southern Mississippi</span>
                <Link to="/about">Accessibility</Link>
            </div>
        </footer>
    );
}

export default Footer;