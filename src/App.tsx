import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import OjectDetail from './pages/ObjectDetail';
import Home from './pages/Home';
import Collection from './pages/Collection';
import Stories from './pages/Stories';
import StoryPathway from './pages/StoryPathway';
import MapPage from './pages/MapPage';
import About from './pages/About';
import Methods from './pages/Methods';
import CookieBanner from './components/CookieBanner';
import Privacy from './pages/Privacy';

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Header />
            <main id="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/collection" element={<Collection />} />
                    <Route path="/collection/:slug" element={<OjectDetail />} />
                    <Route path="/stories" element={<Stories />} />
                    <Route path="/stories/:slug" element={<StoryPathway />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/map" element={<MapPage />} />
                    <Route path ="/methods" element={<Methods />} />
                    <Route path="/privacy" element={<Privacy />} />
                </Routes>
            </main>
            <Footer />
            <CookieBanner />
        </BrowserRouter>
    );
}
export default App;