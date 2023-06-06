import React, { useState } from 'react';
import Home from './components/Home';
import Login from './components/Login.page';
import Register from './components/Register.page';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

export const CredentialsContext = React.createContext();

function App() {
  const credentialState = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <div className="App">
      <CredentialsContext.Provider value={credentialState}>
        <Router>
          <Routes>
          <Route path="/" element={isAuthenticated ? <Home 
            setIsAuthenticated={setIsAuthenticated}
          />: <Login 
            setIsAuthenticated={setIsAuthenticated}
          />} />
            <Route path="/login" element={<Login 
            setIsAuthenticated={setIsAuthenticated}
            />} />
            <Route path="/register" element={<Register 
            setIsAuthenticated={setIsAuthenticated}
            />} />
          </Routes>
        </Router>
      </CredentialsContext.Provider>
    </div>
  );
}

export default App;
