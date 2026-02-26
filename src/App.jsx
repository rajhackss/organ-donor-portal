import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import DonorDashboard from './pages/DonorDashboard';
import RecipientDashboard from './pages/RecipientDashboard';
import AdminDashboard from './pages/AdminDashboard';
import EducationalContent from './pages/EducationalContent';
import Chatbot from './components/Chatbot';
import RoleSelection from './pages/RoleSelection';

// Private Route Component
const PrivateRoute = ({ children, allowedRoles }) => {
  const { currentUser, userRole } = useAuth();

  // Need to use window.location.pathname here to prevent infinite redirects 
  // if PrivateRoute itself is used to protect /role-selection.
  // In our case, /role-selection will also be protected by a PrivateRoute
  // that doesn't need a specific role, but ensures the user is logged in.

  if (!currentUser) return <Navigate to="/login" />;

  // If user is logged in but has no role, and is trying to access a dashboard, 
  // mandate they choose a role first.
  if (!userRole && window.location.pathname !== '/role-selection') {
    return <Navigate to="/role-selection" />;
  }

  // If a specific role is required and user's role doesn't match...
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // If they have a role, just push them back to home or their own dashboard.
    // For now, redirect to home.
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/education" element={<EducationalContent />} />

        {/* Protected Routes */}
        <Route path="/role-selection" element={
          <PrivateRoute>
            <RoleSelection />
          </PrivateRoute>
        } />

        <Route path="/donor" element={
          <PrivateRoute allowedRoles={['donor']}>
            <DonorDashboard />
          </PrivateRoute>
        } />

        <Route path="/recipient" element={
          <PrivateRoute allowedRoles={['recipient']}>
            <RecipientDashboard />
          </PrivateRoute>
        } />

        <Route path="/admin" element={
          <PrivateRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </PrivateRoute>
        } />
      </Routes>
      <Chatbot />
    </div>
  );
}

export default App;
