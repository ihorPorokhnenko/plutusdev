import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import './App.css';
import {UserContext} from './context/UserContext'
import Signup from './pages/Signup'



function App() {

  const [user, setUser] = useState(null)
  {console.log(user)}
  
  return (
  <UserContext.Provider value={{user, setUser}}>
    <h1>THIS WEBSITE IS UNDER CONSTRUCTION</h1>
  <Signup/>
   </UserContext.Provider>
  );

}



export default App;
