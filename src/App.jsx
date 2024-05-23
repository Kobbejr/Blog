import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/NavBar';
import HomePage from './pages/HomePage';
import AddPost from './pages/AddPost';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import { AuthProvider, useAuth } from './context/AuthContext';
import { BlogProvider } from './context/BlogContext';

const AppRoutes = () => {
  const { currentUser } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/add-post"
        element={currentUser ? <AddPost /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={currentUser ? <Navigate to="/" /> : <LoginComponent />}
      />
      <Route
        path="/register"
        element={currentUser ? <Navigate to="/" /> : <RegisterComponent />}
      />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <BlogProvider>
        <Router>
          <Navbar />
          <AppRoutes />
        </Router>
      </BlogProvider>
    </AuthProvider>
  );
};

export default App;
