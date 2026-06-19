//This is the main app component for the project. It will eventually contain the main layout and routing for the application.

import Header from "./components/Header";

function App() {
    return (
        <div>
            <Header />
            <div className = "container">
                {/* Here the wordings needs to be updated */}
                <h1>Digitizing the Cultural Heritage of South Mississippi</h1>
                <p>Our 3d archive is coming soon!</p>
                {/* Wordings need to be updated */}
            </div>
        </div>
    );
}

export default App;
