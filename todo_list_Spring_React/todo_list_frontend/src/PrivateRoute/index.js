import { Navigate } from 'react-router-dom';
import { useLocalState } from '../util/useLocalStorage';

export default function PrivateRoute({children}) {
    const [user,setUser]=useLocalState(
    {
      id:"",
      username:"",
      password:""
    }
    
  );
  return (user.id?children:<Navigate to="/login"/>)
}
