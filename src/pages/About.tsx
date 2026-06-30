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

//The texts below can be edited but proceed with CAUTION
function About() {
    return (
        <div className="container">
            <p className="eyebrow">About the Project</p>
            <h1>Digitizing the Cultural Heritage of South Mississippi</h1>

            <p>
                This project creates high-fidelity 3D models of cultural heritage objects, buildings, and public art across South Mississippi, making them freely available to researchers, educators, and communities.
            </p>

            <h2>Why South Mississippi?</h2>
            <p>
                The region holds extraordinary depth - Indigenous nations, freed people communities, maritime industries, and military history - yet remains underrepresented in national heritage digitization.
            </p>

            <h2>The Team</h2>
            <ul className="team-list">
                {team.map((member) => (
                    <li key={member.name}>
                        <strong>{member.name}</strong> - {member.role}
                    </li>
                ))}
            </ul>

            <h2>Contact</h2>
            <p>
                Center for Digital Humanities<br />
                University of Southern Mississippi<br />
                118 College Drive, Hattiesburg, MS 39406
            </p>
        </div>
    );
}

export default About;