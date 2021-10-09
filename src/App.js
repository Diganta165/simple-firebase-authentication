// import logo from './logo.svg';
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { useState } from 'react';
import './App.css';
import initializeAuthentication from './Firebase/firebase.initialize';



initializeAuthentication();

const provider = new GoogleAuthProvider();




function App() {

const [user, setUser] = useState({})

  const handleGoogleSignIn = () =>{
    const auth = getAuth();
    
    signInWithPopup(auth, provider)
    .then((result)=>{
      const {displayName, email, photoURL} = result.user;
      const loggedInUser = {
        name: displayName,
        email: email,
        photo: photoURL
      };
      setUser(loggedInUser);
    })
    .catch((error)=>{
      console.log(error.message)
    })
    
  }

  
  return (
    <div className="App">
      <button onClick={handleGoogleSignIn} >Google Sign In </button>
    <br />
    {
      user.email && <div>
          <h2>Welcome {user.name}</h2>

        </div>
    }

    </div>
  );
}

export default App;
