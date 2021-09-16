
// import React, { useState } from 'react';
// import { useContext } from 'react';
// import { UserContext } from '../../App';
// import { useHistory, useLocation } from 'react-router-dom';
// import { initializeLoginFramework, handleGoogleSignIn, handleSignOut, handleFbSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './loginManager';



import React, { useState } from 'react';
import './Login.css';
import "firebase/auth";
// import firebase from "firebase/app";
import firebase from 'firebase/compat/app';
import firebaseConfig from './firebase.config';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import './Login.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useContext } from 'react/cjs/react.development';
import {UserContext} from '../../App';
import { useHistory, useLocation } from 'react-router';



if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
else {
  firebase.app();
}



function Login() {

  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    phono: '',
    error: '',
    success: false
  })
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };



  const handleBlur = (e) => {
    let isFieldValid = true;;
    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);


    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value)
      isFieldValid = passwordHasNumber && isPasswordValid;

    }
    if (isFieldValid) {
      const newUserInfo = { ...user }
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }
  const handleSubmit = (e) => {
    console.log(user.email, user.password);
    if (newUser && user.email && user.password) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo)
          setLoggedInUser(newUserInfo);
          history.replace(from);
          updateUserName(user.name);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });


    }
    if (!newUser && user.email && user.password) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          console.log('Sign in user info', res.user);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    e.preventDefault();
  }
  const updateUserName = (name) => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: name
    }).then(() => {
      console.log('user name update successfully')
    }).catch((error) => {
      console.log(error);
    });
  }
  const handleSignIn = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const {displayName,email} = result.user;
        const signedInfo = {name: displayName, email}
        setLoggedInUser(signedInfo)
        history.replace(from);
        console.log( token);
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorMessage, credential, errorCode, email);
      });

  }






  // const [newUser, setNewUser] = useState(false);
  // const [user, setUser] = useState({
  //   isSignedIn: false,
  //   name: '',
  //   email: '',
  //   password: '',
  //   photo: ''
  // });

  // initializeLoginFramework();

  // const [loggedInUser, setLoggedInUser ] = useContext(UserContext);
  // const history = useHistory();
  // const location = useLocation();
  // let { from } = location.state || { from: { pathname: "/" } };

  // const googleSignIn = () => {
  //     handleGoogleSignIn()
  //     .then(res => {
  //       handleResponse(res, true);
  //     })
  // }

  // const fbSignIn = () => {
  //     handleFbSignIn()
  //     .then(res => {
  //       handleResponse(res, true);
  //     })

  // }

  // const signOut = () => {
  //     handleSignOut()
  //     .then(res => {
  //         handleResponse(res, false);
  //     })
  // }

  // const handleResponse = (res, redirect) =>{
  //   setUser(res);
  //   setLoggedInUser(res);
  //   if(redirect){
  //       history.replace(from);
  //   }
  // }

  // const handleBlur = (e) => {
  //   let isFieldValid = true;
  //   if(e.target.name === 'email'){
  //     isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
  //   }
  //   if(e.target.name === 'password'){
  //     const isPasswordValid = e.target.value.length > 6;
  //     const passwordHasNumber =  /\d{1}/.test(e.target.value);
  //     isFieldValid = isPasswordValid && passwordHasNumber;
  //   }
  //   if(isFieldValid){
  //     const newUserInfo = {...user};
  //     newUserInfo[e.target.name] = e.target.value;
  //     setUser(newUserInfo);
  //   }
  // }
  // const handleSubmit = (e) => {
  //   if(newUser && user.email && user.password){
  //     createUserWithEmailAndPassword(user.name, user.email, user.password)
  //     .then(res => {
  //       handleResponse(res, true);
  //     })
  //   }

  //   if(!newUser && user.email && user.password){
  //     signInWithEmailAndPassword(user.email, user.password)
  //     .then(res => {
  //       handleResponse(res, true);
  //     })
  //   }
  //   e.preventDefault();
  // }



  return (

    <div className="form-group">
    <form onSubmit={handleSubmit}>
        <h1>Our Own Authentication</h1>

        <input type="checkbox" name="newUser" onChange={() => setNewUser(!newUser)} id="" />
        <label htmlFor="newUser">New User Sign Up</label>
        <br />
        {newUser && <input type="text" className="form-btn" name="name" onBlur={handleBlur} placeholder="Enter Your Name" />}
        <br />
        <input type="email" className="form-btn" name="email" onBlur={handleBlur} required placeholder="Enter Your Email" />
        <br />
        <input type="password" className="form-btn" name="password" onBlur={handleBlur} required placeholder="Enter Your Password" />
        <br />
        <input type="submit" className="form-submit" value={newUser ? 'Sign Up' : 'Sign In'} />
        <p style={{ color: 'red' }}>{user.error}</p>
        {user.success && <p style={{ color: 'green' }}>User {newUser ? 'Created' : 'Logged In'} Successfully</p>}

        
    </form>
    <button className="form-googleBtn" onClick={handleSignIn}>  Google Sign In</button>
</div>







    // <div style={{textAlign: 'center'}}>
    //   { user.isSignedIn ? <button onClick={signOut}>Sign Out</button> :
    //     <button onClick={googleSignIn}>Sign In</button>
    //   }
    //   <br/>
    //   <button onClick={fbSignIn}>Sign in using Facebook</button>
    //   {
    //     user.isSignedIn && <div>
    //       <p>Welcome, {user.name}!</p>
    //       <p>Your email: {user.email}</p>
    //       <img src={user.photo} alt=""/>
    //     </div>
    //   }

    //   <h1>Our own Authentication</h1>
    //   <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
    //   <label htmlFor="newUser">New User Sign up</label>
    //   <form onSubmit={handleSubmit}>
    //     {newUser && <input name="name" type="text" onBlur={handleBlur} placeholder="Your name"/>}
    //     <br/>
    //     <input type="text" name="email" onBlur={handleBlur} placeholder="Your Email address" required/>
    //     <br/>
    //     <input type="password" name="password" onBlur={handleBlur} placeholder="Your Password" required/>
    //     <br/>
    //     <input type="submit" value={newUser ? 'Sign up' : 'Sign in'}/>
    //   </form>
    //   <p style={{color: 'red'}}>{user.error}</p>
    //   { user.success && <p style={{color: 'green'}}>User { newUser ? 'created' : 'Logged In'} successfully</p>}
    // </div>
  );
}

export default Login;