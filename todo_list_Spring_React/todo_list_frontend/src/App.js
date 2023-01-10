import {BrowserRouter as Router,Routes,Route}from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./pages.scss"
import 'bootstrap-icons/font/bootstrap-icons.css'
import Homepage from './pages/Homepage'
import Dashboard from "./pages/Dashboard";
import Login from './users/Login'
import PrivateRoute from "./PrivateRoute";
import Register from "./users/Register";
import EditTask from "./pages/EditTask";
import NewTask from "./pages/NewTask";
import NewCategory from "./pages/NewCategory";
import NavBar from "./navbar/NavBar";
import DeleteCategories from "./pages/DeleteCategories";
import EditCategory from "./pages/EditCategory";
function App() {
  
  return (
    <Router>
      <div className='bg-primary text-light pt-5' style={{ height: '100vh',width:'100%'}}>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          </Routes>
          
            <Routes>
                <Route path="/newCategory"element={
                <PrivateRoute>
                  <NavBar/>
                  <NewCategory/>
                </PrivateRoute>
              }/>

              <Route path="/dashboard/:categoryGiven" element={
                <PrivateRoute>
                  <NavBar/>
                  <Dashboard/>
                </PrivateRoute>
              }/>

              <Route path="/category/:id" element={
                <PrivateRoute>
                  <NavBar/>
                  <EditCategory/>
                </PrivateRoute>
              }/>

              <Route path="/deleteCategories" element={
                <PrivateRoute>
                  <NavBar/>
                  <DeleteCategories/>
                </PrivateRoute>
              }/>

              <Route path="/newTask/:categoryGiven"element={
                <PrivateRoute>
                  <NavBar/>
                  <NewTask/>
                </PrivateRoute>
              }/>

              <Route path="/task/:id"element={
                <PrivateRoute>
                  <NavBar/>
                  <EditTask/>
                </PrivateRoute>
              }/>
          </Routes>
      </div>
    </Router>
  );
}

export default App;
