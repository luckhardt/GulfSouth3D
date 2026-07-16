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
                <div className="about-section about-section-centered">
                    <h2>Our Mission</h2>
                    <p>
                        {/* Temp */}The Center for Digital Humanities at the University of Southern Mississippi advances the preservation, study, and public accessibility of cultural heritage across the Gulf South. Through photogrammetry, structured-light 3D scanning, and community-engaged archival practice, we create high-fidelity digital surrogates of objects, buildings, and public art that would otherwise remain inaccessible to researchers, educators, and the descendant communities who hold these histories. Every model we produce captures surface detail, wear, and craftsmanship invisible to conventional photography, opening these objects to forms of study — measurement, comparison, close visual analysis — that were previously only possible in person.
                        This archive represents a multi-year collaborative effort with tribal nations, municipal archives, private collectors, and community organizations across South Mississippi. We believe that digitization is not a neutral technical act; it is an act of stewardship that carries responsibility to the people and places represented. Every object included in this collection has been digitized with the informed consent and active participation of the communities from which it originates, and interpretive text is developed collaboratively rather than imposed from outside.
                        Our work is guided by the conviction that the region's material history — its churches, its shipyards, its military installations, its everyday objects of labor and worship — deserves the same scholarly attention and public visibility routinely afforded to more widely studied regions. By making these models freely available under open licensing, we aim to support research, classroom teaching, museum interpretation, and community remembrance alike, ensuring that South Mississippi's layered heritage remains legible — and touchable, in a digital sense — for generations of researchers and residents to come.
                    </p>
                </div>

                <div className="about-section about-section-centered">
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
                <div className="about-section about-section-centered">
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
            </div>
        </div>
    );
}
export default About;