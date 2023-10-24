import React, { useContext, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import Welcome from './Welcome';
import Registration from './Registration';
import Login from './Login';
import Logout from './Logout';
import Dashboard from './Dashboard';
import PHQ9Questionnaire from './PHQ9Questionnaire';
import ResultsPage from './ResultsPage';

// Authentication context
const authContext = createContext();

const useAuth = () => {
  return useContext(authContext);
};

// Providing authentication context
const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

// Custom hook to handle authentication
const useProvideAuth = () => {
  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };

  return {
    isAuthenticated
  };
};

// Protected route component
const ProtectedRoute = ({ children }) => {
  let auth = useAuth();
  return auth.isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Navbar />
      <ProvideAuth>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/questionnaire" element={<ProtectedRoute><PHQ9Questionnaire /></ProtectedRoute>} />
          <Route path="/results" element={<ProtectedRoute><ResultsPage /></ProtectedRoute>} />
        </Routes>
      </ProvideAuth>
    </Router>
  );
}

export default App;
