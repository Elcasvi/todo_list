import {BrowserRouter as Router,Routes,Route}from "react-router-dom"
import './App.css';
import Dashboard from './Dashboard';
import Homepage from './Homepage';
function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/" element={<Homepage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
