import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import Explore from './pages/Explore';
import ExploreDetail from './pages/ExploreDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AdminDestinations from './pages/AdminDestinations';

function AppContent() {
  const location = useLocation(); // Get current location to determine if we are on an auth page
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup'; // Check if the current path is an authentication page
  const needsNavOffset = !isAuthPage && location.pathname !== '/';

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {!isAuthPage && <Navbar />}
      <main className={`flex-grow flex flex-col${needsNavOffset ? ' pt-20' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/explore/:id" element={<ExploreDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/destinations" element={<AdminDestinations />} />
        </Routes>
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
}

function App() {
  return <AppContent />;
}

export default App;
