import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import DonorDashboard from './pages/DonorDashboard';
import RecipientDashboard from './pages/RecipientDashboard';
import AdminDashboard from './pages/AdminDashboard';
import EducationalContent from './pages/EducationalContent';

// Private Route Component
const PrivateRoute = ({ children, allowedRoles }) => {
  const { currentUser, userRole } = useAuth();

  if (!currentUser) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(userRole)) return <Navigate to="/" />;

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
    </div>
  );
}

export default App;
