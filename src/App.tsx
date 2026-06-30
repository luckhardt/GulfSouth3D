//This is the main app component for the project. It will eventually contain the main layout and routing for the application.

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import OjectDetail from './pages/ObjectDetail';
import Home from './pages/Home';
import Collection from './pages/Collection';
import Stories from "./pages/Stories";
import StoryPathway from './pages/StoryPathway';

//Each page is wired through the router and the navigation links are provided in the header. The header is a simple flexbox layout with a logo and navigation links. The main content of the page is rendered based on the current route.

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/collection" element={<Collection />} />
                <Route path="/collection/:slug" element={<OjectDetail />} />
                <Route path ="/stories" element={<Stories />}/>
                <Route path="/stories/:slug" element={<StoryPathway />} />
                {/* stub routes - pages not yet implemented */}
                <Route path ="/map" element={<div className="container"><h1>Map</h1></div>}/>
                <Route path ="/about" element={<div className="container"><h1>About</h1></div>}/>
            </Routes>
        </BrowserRouter>
    );

}
export default App;
