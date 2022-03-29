import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Protect from 'react-app-protect'
import './App.css';
import { UserContext } from './context/UserContext'
// import Signup from './pages/Signup'
import Home from './pages/Home'
import { hash } from './utils/hash'


function App() {

  const [user, setUser] = useState(null)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Protect
        sha512={hash}
        styles={{
          input: { color: 'blue' },
          header: { fontSize: '20px' }
        }}
      >
        {/* <Signup /> */}
        <Home />
      </Protect>
    </UserContext.Provider>
  );
}

export default App;
