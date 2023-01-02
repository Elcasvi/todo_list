import {BrowserRouter as Router,Routes,Route}from "react-router-dom"
import './App.css';
import Homepage from './pages/Homepage'
import Dashboard from "./pages/Dashboard";
import Login from './users/Login'
import PrivateRoute from "./PrivateRoute";
function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/login" element={<Login/>}/>

        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        }/>
        
      </Routes>
    </Router>
  );
}

export default App;
