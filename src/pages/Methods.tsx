function Methods() {
    return (
        <div>
            <div className="about-hero methods-hero">
                <p className="eyebrow">Methodology</p>
                <h1>How We Make 3D Models</h1>
                <p>A guide to the capture methods, decisions, and tools behind this project.</p>
            </div>

            <div className="container">

                {/* Why 3D? */}
                <div className="about-section">
                    <h2>Why 3D?</h2>
                    <p>
                        The point of a 3D model is not that it is new technology. The point is that it changes the act of looking. A photograph shows one view of an object or place. A 3D model lets a viewer turn it, move around it, zoom in or out, and notice form, scale, surface, wear, damage, repair, and placement. These models are not replacements for the original objects, buildings, or artworks. They are another way to study them.
                    </p>
                    <p>
                        A model can make it easier to see how an object was shaped, handled, decorated, or worn down over time. For buildings and public art, 3D can help show mass, scale, architectural form, and the relationship between a site and its surroundings.
                    </p>
                    <p>
                        3D modeling is not neutral copying. Every model reflects decisions about capture, processing, cleanup, file size, metadata, and display. Those decisions are part of the scholarship of the project.
                    </p>
                </div>

                {/* Capture Methods — first paragraph immediately below heading,
                    last paragraph (photography/object handling) moved above the cards */}
                <div className="about-section">
                    <h2>Capture Methods</h2>

                    {/* First paragraph directly below heading per feedback */}
                    <p className="about-section-intro" style={{marginLeft: "90px",  marginBottom:"25px"}}>
                        The models in this project were made through several different capture methods, depending on the object or site.
                    </p>
                    {/* Three numbered method cards */}
                    <div className="methods-grid">
                        <div className="method-card">
                            <h3 className="indent">1. Tabletop Photogrammetry</h3>
                            <p>A DSLR camera is used with various lenses for smaller objects. This process involves taking many photographs of an object from different angles and using software to build a 3D model from those images.</p>
                        </div>
                        <div className="method-card">
                            <h3 className="indent">2. Structured-Light Scanning</h3>
                            <p>This method is used when better suited to the object. This method projects light onto the object's surface and records its shape in three dimensions.</p>
                        </div>
                        <div className="method-card">
                            <h3 className="indent">3. UAS Photogrammetry</h3>
                            <p>Drones are used for buildings and outdoor sites where aerial capture could show scale, rooflines, architectural form, and the relationship between a site and its setting.</p>
                        </div>
                    </div>
                    <p className="about-section-intro" style={{marginLeft: "90px",  marginTop:"25px"}}>
                        Photography and lighting mattered at every stage. Shiny, dark, transparent, fragile, or highly detailed objects can be difficult to model. Outdoors, weather conditions matter enormously for both drone flight and photo quality. Some objects required changes in lighting, background, angle, or capture method. Others could not be modeled successfully with the tools available to us.
                    </p>
                    <p className="about-section-intro" style={{marginLeft: "90px"}}>
                       Object handling was also part of the method. Historical objects are not props. Many are fragile, rare, or held by partner institutions. Capture decisions had to balance model quality with care for the object.
                    </p>

                    <div className="methods-row">
                        <img src="/methods/scanning-1.jpg" alt="Capturing an object during scanning" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                        <img src="/methods/scanning-2.jpg" alt="Capturing an object during scanning" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                        <img src="/methods/scanning-3.jpg" alt="Capturing an object during scanning" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                    </div>
                </div>

                {/* Processing Workflow */}
                <div className="about-section">
                    <h2>Processing Workflow</h2>
                    <p>
                        After capture, image sets and scan data were processed into models using photogrammetry software. The project used Metashape for photogrammetry processing, RevoScan when structured-light scanning was used, and Blender for cleanup or adjustment when needed.
                    </p>
                    <p>
                        Processing included alignment, mesh construction, texture generation, model cleanup, export, and web optimization. The final public models were exported in GLB format so that they could be displayed online.
                    </p>
                    <p>
                        A model that looks good in processing software is not automatically ready for the web. Large files have to be optimized. Holes, alignment errors, missing surfaces, texture problems, and scale issues have to be reviewed. Some models needed repaired or to be reduced in size, and some objects or sites could not be completed at publishable quality.
                    </p>

                    <div className="methods-row methods-row-lg">
                        <img src="/methods/processing-1.jpg" alt="Processing a 3D model" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                        <img src="/methods/processing-2.jpg" alt="Processing a 3D model" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                    </div>
                </div>

                {/* Metadata and Archive */}
                <div className="about-section">
                    <h2>Metadata and Archive</h2>
                    <p>
                        The project uses Omeka Classic as the system of record on the web. Each item record holds the structured information about the object or site, including title, category, themes, date or period, location, holding institution, rights information, and digitization data. Fuller capture and processing data is held offline using the Digital Lab Notebook software from Cultural Heritage Imaging.
                    </p>
                    <p>
                        The public website is the narrative layer. It is where visitors can enter through stories, places, models, and interpretive text. Metadata is part of the interpretation. Choosing a title, date range, location, category, theme, and rights statement shapes how an object can be found and understood. The goal is not only to display models, but to connect each model to the information needed to study it responsibly.
                    </p>
                </div>

                {/* Limits of 3D */}
                <div className="about-section">
                    <h2>Limits of 3D</h2>
                    <p>
                        A 3D scan is an interpretative model — it is not the object itself. Models omit things that matter: weight, smell, interior structure, exact texture, original context, restricted cultural knowledge, or the experience of being physically present with an object or place. A model can also make an object seem more complete, more stable, or more accessible than it really is.
                    </p>
                    <p>
                        Some materials are difficult to model. Glass, shiny surfaces, trees moving in the wind, dark objects, thin edges, and complex interiors can produce incomplete or distorted results. Some sites are difficult because of weather, access, vegetation, light, safety, or permissions.
                    </p>
                    <p>
                        Some materials should not be digitized or publicly displayed. Archaeological, cultural, religious, or community-sensitive materials require care. Public access is not always the highest value; permission, context, and stewardship matter.
                    </p>
                </div>

                {/* Training Workflow */}
                <div className="about-section">
                    <h2>Training Workflow</h2>
                    <p>
                        This project was also a training workflow. Students participated at every level as part of a project team to capture, processing, metadata, quality review, and public presentation. They learned that 3D cultural heritage work is not only technical. It requires historical interpretation, documentation, permissions, object care, file management, metadata, and public communication.
                    </p>
                    <p>
                        The project team was chosen from students who had previously completed a Digital Humanities internship course (Humanities 695). The workflow developed for this project is meant to be reusable. It gives the Center for Digital Humanities a model for future projects that connect 3D modeling, archival description, and public digital scholarship.
                    </p>

                    <img src="/methods/hum-695.jpg" alt="Students in the Humanities 695 training course" className="methods-photo-single" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                </div>

                {/* AI Disclosure */}
                <div className="about-section">
                    <h2>AI Disclosure</h2>
                    <p>
                        AI tools were used in the building process for this website, including brainstorming, revision, and organization, as well as coding and debugging support. AI also assisted with drafting alt text for images and 3D models for accessibility.
                    </p>
                    <p>
                        All alt text, object selection, historical interpretation, metadata, permissions decisions, and final text were reviewed and approved by the project team.
                    </p>
                </div>

            </div>
        </div>
    );
}

export default Methods;