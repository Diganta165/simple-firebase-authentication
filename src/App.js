// import logo from './logo.svg';
import {GoogleAuthProvider, getAuth, signInWithPopup, signOut} from 'firebase/auth'
import { useState } from 'react';
import './App.css';
import initializeAuthentication from './Firebase/firebase.initialize';



initializeAuthentication();

const provider = new GoogleAuthProvider();




function App() {

const [user, setUser] = useState({})
const auth = getAuth();

  const handleGoogleSignIn = () =>{
    
    
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

  const handleLogOut = () =>{
    signOut(auth).then(() => {
      setUser({});
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  
  return (
    <div className="App">
      { !user.name ? 
        
          <button onClick={handleGoogleSignIn} >Google Sign In </button>
        
        :
        <button onClick={handleLogOut}>Log Out </button>
        
      }
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
