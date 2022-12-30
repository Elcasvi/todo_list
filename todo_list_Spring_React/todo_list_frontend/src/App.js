import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [user,setUser]=useState(
    {
      username:"dev",
      password:"Theshad0999"
    }
  )
  var change=false;

  useEffect(()=>
  {
    getUser()
  },[])

/*
    useEffect(()=>{
      axios.post("http://localhost:8080/api/login",user)
      .then((response)=>
      {
        console.log("Todo bien!!!!!!!!")
        console.log(response.data)
      })
      .catch((error)=>
      {
        console.log("Error!!!!!!!!!!!!!!!")
        console.log(error.response.status);
      })
  })
*/

  
  const getUser=async()=>
  {
    const myUser=await axios.post("http://localhost:8080/api/login",user)
    .then((response)=>
    {
      console.log("Todo bien!!!!!!!!")
      console.log(response.data)
    })
    .catch((error)=>
    {
      console.log("Error!!!!!!!!!!!!!!!")
      console.log(error.response.status);
    })
    
  }


  return (
    <div>
      <p>Hello World!!!</p>
      
    </div>
  );
}

export default App;
