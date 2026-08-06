import { Link } from "react-router-dom";
import { STORY_CARDS } from "../data/taxonomy";

// Cards grouped by editorial theme, selected by slug rather than array order
// so taxonomy.ts order doesn't need to change (which would affect Home page)
const GROUP_ONE = ["community-memory", "archaeology"];
const GROUP_TWO = ["historic-buildings", "public-and-decorative-arts"];

function Stories() {
    const groupOne = GROUP_ONE
        .map((slug) => STORY_CARDS.find((c) => c.slug === slug)!)
        .filter(Boolean);

    const groupTwo = GROUP_TWO
        .map((slug) => STORY_CARDS.find((c) => c.slug === slug)!)
        .filter(Boolean);

    return (
        <div>
            {/*  Hero  */}
            <div className="stories-hero">
                <p className="eyebrow">Story Pathways</p>
                <h1>Stories from South Mississippi's Material and Spatial Heritage</h1>
                <p>
                    Choose a pathway to follow a curated thread through the collection —
                    each one shaped by a guiding question about place, people, and memory
                    in South Mississippi.
                </p>
            </div>

            {/*  Opening interpretive section  */}
            <div className="stories-intro">
                <div className="stories-intro-inner">
                    <h2>What kinds of stories can 3D cultural heritage tell?</h2>
                    <p>
                        3D cultural heritage begins with looking closely. A model lets us examine form, texture, damage, or the relationship between a place and its surroundings. The meaning of why a historical object or place looks the way it does comes from the questions we ask of it: why something was kept, how a place was used, what a fragment can still show, or how an artwork changes public space.
                    </p>
                    <p>
                        The stories on this site begin with material things, but they move outward to community memory, Indigenous and colonial histories, public life, education, faith, institutional belonging, and South Mississippi's connections to the wider world.
                    </p>
                </div>
            </div>

            {/*  Quote band  */}
            <div className="quote-band">
                <blockquote className="quote-band-text">
                    "My work to fill in the blanks, the absences, the omissions… the narratives I seek to restore have been there all along."
                </blockquote>
                <p className="quote-band-attribution">— Natasha Trethewey, <em>"You Are Not Safe in Science; You Are Not Safe in History"</em></p>
            </div>

            {/*  Stories about things people kept  */}
            <div className="stories-section">
                <div className="stories-section-inner">
                    <h2>Stories about things people kept and discarded</h2>
                    <p>
                        Some objects survive because people kept them. Others survive because they were buried or discarded, then later excavated. Time acts on both kinds of objects; it rusts metal, wears fabric, breaks ceramics, and changes what can still be seen.
                    </p>
                    <p>
                        The uniforms, such as the Dixie Darling dance team uniform and the nurse's uniform, were preserved because they carried meaning, like university pride or a professional identity. They help tell stories about why people decided some objects became worth saving and how a personal or institutional keepsake can become part of a community's public memory.
                    </p>
                    <p>
                        Archaeological objects come from a different kind of survival. The Indigenous projectile points or colonial-era pottery fragments did not survive through deliberate keeping. They were used, then lost or left behind. Their stories and meaning depends less on deliberate memory and more on material traces: what remains after people's daily life, work, or foodways have passed.
                    </p>
                    <p>
                        Studied together, these objects show that cultural heritage is made from treasured things, but also fragments that survived long enough to be studied. Both kinds of evidence matter because they reveal histories that written records may leave out, simplify, or describe only from the outside.
                    </p>
                    
                </div>
                <div className="quote-band">
                    <p className="quote-band-text">"Time eats away at things: it rusts machinery, it matures animals to become hairless and featherless, and it withers plants"</p>
                    <span className="quote-band-attribution">- Jesmyn Ward, <em>Sing, Unburied, Sing</em></span>
                </div>
            </div>

            {/*  Group 1: Community Memory + Archaeology  */}
            <div className="container">
                {groupOne.map((card, index) => (
                    <div
                        key={card.slug}
                        className={`stories-pathway ${index % 2 !== 0 ? "reverse" : ""}`}
                        style={{ direction: index % 2 !== 0 ? "rtl" : "ltr" }}
                    >
                        <Link
                            to={`/stories/${card.slug}`}
                            className="story-card-image"
                            style={{ backgroundImage: `url(/story-images/${card.slug}.jpg)` }}
                        >
                            <div>
                                <span className="eyebrow">{card.label}</span>
                                <h2>{card.question}</h2>
                                <span className="story-explore">Explore →</span>
                            </div>
                        </Link>
                        <div className="stories-pathway-text" style={{ direction: "ltr" }}>
                            <span className="eyebrow">{card.label}</span>
                            <p>{card.teaser}</p>
                            <Link to={`/stories/${card.slug}`} className="btn btn-solid">
                                Explore {card.label} →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/*  Quote band  */}
            <div className="quote-band">
                <blockquote className="quote-band-text">
                    "This is a memory of the Coast: to each his own<br></br> recollections, her reclamations, their<br></br> restorations, the return of the Coast."
                </blockquote>
                <p className="quote-band-attribution">Natasha Trethewey, <em>"Liturgy, For the Mississippi Gulf Coast"</em></p>
            </div>

            {/*  Stories about places  */}
            <div className="stories-section">
                <div className="stories-section-inner">
                    <h2>Stories about places people built and inhabited</h2>
                    <p>
                        Some stories become visible because people built places for gathering, worship, and public life. Others become visible because artists and communities placed images, humor, or beauty into shared spaces. Bennett Auditorium on the campus of USM, Bay Street Presbyterian Church in Hattiesburg, and 100 Men Hall in Bay St. Louis show how architecture organized public experience: who assembled there, who worshipped or performed there, who had to fight for access or recognition.
                    </p>
                    <p>
                        Public and decorative arts show a different side of how values are made visible. The painted utility boxes and murals in Hattiesburg, like the <em>All That Jazz</em> utility box or the <em>Plant a Seed</em> mural, were not built as formal institutions. They belong instead to the visual life of everyday places: routes, corners, and public-facing spaces. Their meaning comes from placement, design, and encounter, including what people notice or just pass by.
                    </p>
                    <p>
                        Studied together, historic buildings and public art show that cultural heritage is not only kept in archives and museums, but also in the places people enter, remember, and move through every day.
                    </p>
                </div>
            </div>

            {/*  Group 2: Historic Buildings + Public Art  */}
            <div className="container">
                {groupTwo.map((card, index) => (
                    <div
                        key={card.slug}
                        className={`stories-pathway ${index % 2 !== 0 ? "reverse" : ""}`}
                        style={{ direction: index % 2 !== 0 ? "rtl" : "ltr" }}
                    >
                        <Link
                            to={`/stories/${card.slug}`}
                            className="story-card-image"
                            style={{ backgroundImage: `url(/story-images/${card.slug}.jpg)` }}
                        >
                            <div>
                                <span className="eyebrow">{card.label}</span>
                                <h2>{card.question}</h2>
                                <span className="story-explore">Explore →</span>
                            </div>
                        </Link>
                        <div className="stories-pathway-text" style={{ direction: "ltr" }}>
                            <span className="eyebrow">{card.label}</span>
                            <p>{card.teaser}</p>
                            <Link to={`/stories/${card.slug}`} className="btn btn-solid">
                                Explore {card.label} →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/*  Quote band  */}
            <div className="quote-band">
                <blockquote className="quote-band-text">
                    "One place comprehended can make us understand other places better. Sense of place gives us equilibrium; extended, it is sense of direction too."
                </blockquote>
                <p className="quote-band-attribution">Eudora Welty, <em>"Place in Fiction"</em></p>
            </div>

            {/*  Stories about larger histories  */}
            <div className="stories-section">
                <div className="stories-section-inner">
                    <h2>Stories about South Mississippi's connections to larger histories</h2>
                    <p>
                         Some objects and places matter because they show how South Mississippi connects to larger histories. The pre-World War II gas mask connects local collections to military service and global conflict. The Eureka School in Hattiesburg opens stories about Black education and community life. Projectile points connect us to Indigenous histories and deep time, showing material traces that long predate written records. Houses of worship like Our Lady of the Gulf Catholic Church in Bay St. Louis and Temple B'nai Israel in Hattiesburg show how civic and religious identity took shape in specific communities. The Seymour the Golden Eagle whiskey decanter connects university culture to pride and institutional belonging. 
                    </p>
                    <p>
                       Studied together, these objects and places show that regional history is not small history.
                    </p>
                    <p>
                        A uniform, a school, a church, a projectile point, a decanter, or an auditorium begins in one place, but each one reaches outward. They show how national and global events were lived locally, how communities built institutions in response to larger forces, and how South Mississippi's histories can help us understand broader patterns of war, education, faith, Indigenous presence, public life, and belonging. 
                    </p>
                </div>
            </div>

            {/*  Footer link  */}
            <div className="stories-footer-link">
                <Link to="/collection">Prefer to browse by object? View the full collection →</Link>
            </div>

            <div className="home-logo">
                <img src="/stories-logo.jpg" alt="Stories logo" />
            </div>
        </div>
    );
}

export default Stories;