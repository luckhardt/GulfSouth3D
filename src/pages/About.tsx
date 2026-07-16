// The Project team: a small local array that is rendered into a list.
//the names and roles can be edited
const team = [
    { name: "Dr. Courtney Luckhardt", role: "Principal Investigator" },
    { name: "Luke Bynum", role: "Aerial Lead & Co-Production Lead" },
    { name: "Gabbie Bankston", role: "Tabletop Lead & Co-Production Lead" },
    { name: "Emily Zylka", role: "Senior Processing Lead" },
    { name: "Madaline Ponthieux", role: "Metadata Lead" },
    { name: "Sushil Pandey", role: "Web Developer" },
//  { name: "abcd", role: "abcd" },
/*In case if anyone is missed use the above layout to add*/
];

function getInitials(name: string): string {
    const words = name.split(" ").filter((word) => !word.endsWith("."));
    return words.map((word) => word[0]).join("").toUpperCase();
}

//The texts below can be edited but proceed with CAUTION
function About() {
    return (
        <div>
            <div className="about-hero">
                <p className="eyebrow">About</p>
                <h1>Center for Digital Humanities</h1>
                <p>University of Southern Mississippi · Hattiesburg, MS</p>
            </div>

            <div className="container">
                <div className="about-section">
                    <h2>Our Mission</h2>
                    <p>
                        {/* Temp */}The Center for Digital Humanities at the University of Southern Mississippi advances the preservation, study, and public accessibility of cultural heritage across the Gulf South. Through photogrammetry, structured-light 3D scanning, and community-engaged archival practice, we create high-fidelity digital surrogates of objects, buildings, and public art that would otherwise remain inaccessible to researchers, educators, and the descendant communities who hold these histories. Every model we produce captures surface detail, wear, and craftsmanship invisible to conventional photography, opening these objects to forms of study — measurement, comparison, close visual analysis — that were previously only possible in person.
                        This archive represents a multi-year collaborative effort with tribal nations, municipal archives, private collectors, and community organizations across South Mississippi. We believe that digitization is not a neutral technical act; it is an act of stewardship that carries responsibility to the people and places represented. Every object included in this collection has been digitized with the informed consent and active participation of the communities from which it originates, and interpretive text is developed collaboratively rather than imposed from outside.
                        Our work is guided by the conviction that the region's material history — its churches, its shipyards, its military installations, its everyday objects of labor and worship — deserves the same scholarly attention and public visibility routinely afforded to more widely studied regions. By making these models freely available under open licensing, we aim to support research, classroom teaching, museum interpretation, and community remembrance alike, ensuring that South Mississippi's layered heritage remains legible — and touchable, in a digital sense — for generations of researchers and residents to come.
                    </p>
                </div>

                <div className="about-section">
                    <h2>Why South Mississippi?</h2>
                    <p>
                        {/* Temp */}The Gulf South is one of the most culturally layered regions of North America, shaped by overlapping Indigenous nations, French and Spanish colonial regimes, the forced migration of enslaved Africans, and successive waves of Vietnamese, Croatian, Cajun, and other immigrant communities. This palimpsest of peoples and practices has produced a material record of extraordinary density — one that national heritage digitization programs have only begun to address.
                        South Mississippi in particular occupies a geographic and cultural threshold: where the Piney Woods meet the coastal plain, where the Mississippi River's influence gives way to the sound and the sea. Archaeological sites along the Natchez Trace, shell middens in the Mississippi Sound, timber camps in the longleaf pine belt, and African American congregational archives in Hattiesburg all speak to histories that national narratives routinely bypass in favor of better-resourced, more heavily studied regions.
                        Military history compounds this density: Camp Shelby's role in mobilizing tens of thousands of WWI and WWII draftees, coastal defense installations, and the lighthouses that guided maritime traffic along a historically dangerous coastline all leave behind material traces scattered across small museums, private collections, and community archives with limited capacity for professional conservation or digitization.
                        The Center for Digital Humanities is committed to filling that gap with rigorous, community-centered digital scholarship — treating South Mississippi not as a peripheral footnote to national history, but as a region whose material culture merits sustained, careful, and collaborative study in its own right.                    </p>
                </div>

                <div className="about-section">
                    <h2>Our Four Pillars</h2>
                    <div className="pillars-grid">
                        <div className="pillar-card">
                            <div className="pillar-icon">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                            </div>
                            <h3>3D Digitization</h3>
                            <p>{/* Temp */}We use photogrammetry and structured-light scanning to capture sub-millimeter surface detail, enabling researchers worldwide to study objects in dimensions previously unavailable.</p>
                        </div>
                        <div className="pillar-card">
                            <div className="pillar-icon">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                            </div>
                            <h3>Community Partnership</h3>
                            <p>{/* Temp */}Every digitization project begins with community consultation. Tribal nations, local historical societies, and descendant communities guide what we digitize and how it is described.</p>
                        </div>
                        <div className="pillar-card">
                            <div className="pillar-icon">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v18M8 6l4-3 4 3M5 12h2a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM17 12h2a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/></svg>
                            </div>
                            <h3>Open Scholarship</h3>
                            <p>{/* Temp */}3D models, metadata, and contextual descriptions are made freely available under Creative Commons licensing, supporting open-access research and education.</p>
                        </div>
                        <div className="pillar-card">
                            <div className="pillar-icon">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                            </div>
                            <h3>Regional Focus</h3>
                            <p>{/* Temp */}Our collection centers on the Gulf South — a region of extraordinary cultural complexity that has been chronically underrepresented in national heritage digitization programs.</p>
                        </div>
                    </div>
                </div>

                <div className="about-section">
                    <h2>Project Team</h2>
                    <ul className="team-list">
                        {team.map((member) => (
                            <li key={member.name}>
                                <div className="team-avatar">{getInitials(member.name)}</div>
                                <div>
                                    <span className="team-name">{member.name}</span>
                                    <span className="team-role">{member.role}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="about-section">
                    <h2>Rights & Stewardship</h2>
                    <p>
                        {/* Temp */}Descriptive metadata and interpretive text on this site are published under a Creative Commons Attribution-NonCommercial 4.0 (CC BY-NC 4.0) license. 3D model files are released under CC BY-NC-SA 4.0. Rights in individual objects remain with originating institutions, descendant communities, or other rights holders as noted in each record's provenance statement.
                    </p>
                    <p>
                        {/* Temp */}Community consent is foundational to our digitization workflow. Before any object connected to a living community is published, we seek explicit written approval from designated community representatives. If you believe an object has been published without adequate consent, or wish to request a correction, contact us at dh@usm.edu.
                    </p>
                </div>

                <div className="about-section">
                    <h2>Community Partners</h2>
                    <div className="partner-pills">
                        <span className="partner-pill">
                            {/* Temp */}Mississippi Band of Choctaw Indians
                        </span>
                        <span className="partner-pill">
                            {/* Temp */}Biloxi Maritime Heritage Foundation
                        </span>
                        <span className="partner-pill">
                            {/* Temp */}Natchez Historical Society
                        </span>
                        <span className="partner-pill">
                            {/* Temp */}Camp Shelby Military Museum
                        </span>
                    </div>
                </div>

                <div className="about-section">
                    <h2>Connect With Us</h2>
                    <p>Follow the Center for Updates on new digitization projects, community partnership and 3D Model Releases.</p>
                    <div className="connect-grid">
                        <a href="https://www.instagram.com/dhatsouthernmiss/" target="_blank" rel="noopener noreferrer" className="connect-card">
                            <div className="connect-icon" style={{ background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                            </div>
                            <div className="connect-info">
                                <span className="connect-platform">Instagram</span>
                                <span className="connect-handle">@dhatsouthernmiss</span>
                            </div>
                            <span className="connect-arrow">↗</span>
                        </a>

                        <a href="https://www.facebook.com/DHatUSM/" target="_blank" rel="noopener noreferrer" className="connect-card">
                            <div className="connect-icon" style={{ background: "#1877F2" }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 1.913-.287 1.754h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.628-5.373-12-12-12s-12 5.372-12 12c0 6.135 4.604 11.194 10.101 11.647z"/></svg>
                            </div>
                            <div className="connect-info">
                                <span className="connect-platform">Facebook</span>
                                <span className="connect-handle">@DHatUSM</span>
                            </div>
                            <span className="connect-arrow">↗</span>
                        </a>
                        <a href="https://www.threads.com/@dhatsouthernmiss" target="_blank" rel="noopener noreferrer" className="connect-card">
                            <div className="connect-icon" style={{ background: "#000000" }}>
                                <svg width="18" height="18" viewBox="0 0 192 192" fill="currentColor"><path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.395 132.296C133.574 125.696 136.87 117.143 138.336 106.366C144.365 110.02 148.836 114.828 151.3 120.63C155.484 130.469 155.727 146.679 142.517 159.877C130.947 171.437 117.089 176.463 96.9631 176.61C74.6516 176.443 57.7538 169.246 45.7381 154.859C34.4877 141.375 28.6763 122.407 28.4534 96.0002C28.6763 69.5931 34.4877 50.6249 45.7381 37.1409C57.7538 22.7538 74.6516 15.5567 96.9631 15.3897C119.437 15.5581 136.628 22.7889 148.06 37.3524C153.664 44.5054 157.884 53.4501 160.673 63.9384L177.031 59.6613C173.685 46.9738 168.315 36.0181 160.938 26.6062C146.386 8.05605 125.078-1.42214 97.5619-1.61212C70.2065-1.42214 49.1211 8.09202 34.9448 27.0139C22.3452 43.7783 15.8551 66.9411 15.5698 95.9628L15.5695 96.0002L15.5698 96.0377C15.8551 125.059 22.3452 148.222 34.9448 164.986C49.1211 183.908 70.2065 193.422 97.5619 193.612C121.965 193.44 138.867 187.107 152.842 173.174C171.148 154.958 170.605 132.202 164.437 118.437C160.011 108.578 151.622 100.601 141.537 88.9883Z"/></svg>
                            </div>
                            <div className="connect-info">
                                <span className="connect-platform">Threads</span>
                                <span className="connect-handle">@dhatsouthernmiss</span>
                            </div>
                            <span className="connect-arrow">↗</span>
                        </a>
                        <a href="https://www.youtube.com/@CDHatUSM" target="_blank" rel="noopener noreferrer" className="connect-card">
                            <div className="connect-icon" style={{ background: "#FF0000" }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                            </div>
                            <div className="connect-info">
                                <span className="connect-platform">YouTube</span>
                                <span className="connect-handle">Center for Digital Humanities at USM</span>
                            </div>
                            <span className="connect-arrow">↗</span>
                        </a>
                    </div>
                </div>

                <div className="about-section">
                    <h2>Contact</h2>
                    <div className="contact-panel">
                        <div className="contact-item">
                            <div className="contact-icon">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                            </div>
                            <div>
                                <span className="contact-label">Email</span>
                                <span className="contact-value">dh@usm.edu</span>
                            </div>
                        </div>
                        <div className="contact-item">
                            <div className="contact-icon">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                            </div>
                            <div>
                                <span className="contact-label">Phone</span>
                                <span className="contact-value">{/* Temp */}(601) 266-4321</span>
                            </div>
                        </div>
                        <div className="contact-item">
                            <div className="contact-icon">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                            </div>
                            <div>
                                <span className="contact-label">Address</span>
                                <span className="contact-value">118 College Drive<br />Hattiesburg, MS 39406</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default About;