import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth,signInWithEmailAndPassword,signOut,signInWithPopup,GoogleAuthProvider,GithubAuthProvider} from "firebase/auth"
import { useState } from "react";

function App() {
  const  firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [user,setUser]=useState({})

  const app=initializeApp(firebaseConfig)
  const auth=getAuth(app)
  const googleprovider=new GoogleAuthProvider() 
  const githubprovider=new GithubAuthProvider()
  
  const signUp=()=>{
    createUserWithEmailAndPassword(auth,email,password)
    .then(userCredentials => {
       setUser(userCredentials.user)
       console.log(userCredentials.user)
    })
    .catch(error =>{
      console.log(error)
    })
  }
  const signIn=()=>{
    signInWithEmailAndPassword(auth,email,password)
      .then(userCredentials=>{
        setUser(userCredentials.user)
        console.log(userCredentials.user)
      })
      .catch(error=>{
        console.log(error)
      })
  }
  const logOut=()=>{
    signOut(auth)
    .then(()=>{
      setUser({})
    console.log("user logged out")
    })
    .catch(error=>{
      console.log(error)
    })
  }
  const google=()=>{
    signInWithPopup(auth,googleprovider)
    .then(userCredentials=>{
      setUser(userCredentials.user)
      console.log(userCredentials.user)
    })
    .catch(error=>{
      console.log(error)
    })
  }
  const github=()=>{
   signInWithPopup(auth,githubprovider)
   .then(userCredentials=>{
     setUser(userCredentials.user)
     console.log(userCredentials.user)
   })
   .catch(error=>{
    console.log(error)
   })
  }
  return (
    <div>
      <input type="text" placeholder="email" onChange={(e)=>setEmail(e.target.value)} />
      <input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)} />
      <button onClick={signUp}>signup</button>
      <button onClick={signIn}>signin</button>
      <button onClick={logOut}>logout</button>
      <button onClick={google}>Login with Google</button>
      <button onClick={github}>Login with Github</button>
    </div>
  )
}

export default App
