import {useState} from 'react';
import {UserContext} from './context/UserContext'
// import Signup from './pages/Signup'
import Home from './pages/Home'

function App() {
    const [user, setUser] = useState(null)

    return (
        <UserContext.Provider value={{user, setUser}}>
            {/* <Signup /> */}
            <Home />
        </UserContext.Provider>
    );
}

export default App;
