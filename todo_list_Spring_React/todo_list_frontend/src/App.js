import {BrowserRouter as Router,Routes,Route}from "react-router-dom"
import './App.css';
import Homepage from './pages/Homepage'
import Dashboard from "./pages/Dashboard";
import Login from './users/Login'
import PrivateRoute from "./PrivateRoute";
import Register from "./users/Register";
import EditTask from "./pages/EditTask";
function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>

        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        }/>

        <Route path="task/:id"element={
          <PrivateRoute>
            <EditTask/>
          </PrivateRoute>
        }/>


      </Routes>
    </Router>
  );
}

export default App;
