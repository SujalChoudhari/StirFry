import './App.css';
import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, orderBy, limit, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth, signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Header from './Header';

const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "stir-dry.firebaseapp.com",
  projectId: "stir-dry",
  storageBucket: "stir-dry.appspot.com",
  messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});


const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const firestore = getFirestore(app);

function SignIn() {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider);
  }

  return (
    <div className='sign-in-page'>
      <button className="sign-in-button" onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => { auth.signOut() }}>Sign Out</button>
  );
}

function ChatMessage({ message }) {
  const { text, uid, photoURl } = message;

  const msgClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <div key={uid} className={`message ${msgClass}`}>
      <img referrerpolicy="no-referrer" src={photoURl} alt="profile pic" />
      <p>{text}</p>
    </div>
  );
}

function ChatRoom() {

  const msgRef = collection(firestore, 'messages');
  const q = query(msgRef, orderBy('createdAt',), limit(25));

  const [messages, loading] = useCollectionData(q, { initialValue: [] });
  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();

    addDoc(msgRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid: auth.currentUser.uid,
      photoURl: auth.currentUser.photoURL
    })
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div>
        {messages &&
          messages.map(msg => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
      </div>

      <div>
        <form onSubmit={sendMessage}>
          <input value={formValue} onChange={(e) => { setFormValue(e.target.value) }} />
          <button type="submit">Post</button>
        </form>
      </div>
    </div>
  );
}

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="">
      <header className="">
        <Header />
      </header>
      <SignOut />
      {user ? <ChatRoom /> : <SignIn />}
    </div>
  );
}

export default App;
