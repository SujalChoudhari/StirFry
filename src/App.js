import './App.css';
import "./Auth.css";
import "./Chat.css";
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
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
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
      <button className="sign-in-button" onClick={signInWithGoogle}>Sign In <img  className='g-logo' src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google logo" /></button>
      <p className='sign-in-message'>Looks like you're not signed in. Sign in to chat!</p>
      <p className='fineprint'> <b>Note:</b>  This chat app is intended for use by individuals who are 18 years of age or older. By using this app, you confirm that you are at least 18 years old.

        Please be aware that this chat app does not have any rules or regulations governing the content or behavior of its users. As such, some content or interactions may be inappropriate, offensive, or harmful.

        We strongly encourage all users to exercise caution and good judgment when using this app. If you encounter any content or behavior that you believe is inappropriate, offensive, or harmful, please report it to us immediately.

        Please note that we do not monitor or moderate the content or behavior of our users. We are not responsible for any harm or damage that may result from your use of this app.

        By using this app, you agree to release us from any and all liability arising from your use of this app.

        Thank you for using our chat app. We hope you have a safe and enjoyable experience. 😊
      </p>
    </div>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button className='sign-out' onClick={() => { auth.signOut() }}>Sign Out</button>
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
  const q = query(msgRef, orderBy('createdAt','desc'), limit(15));

  const [messages, loading] = useCollectionData(q, { initialValue: [] });
  var audio  = new Audio("./dropped.wav");
      // audio.play();

  const [formValue, setFormValue] = useState('');

  const focusDiv = React.useRef( );

  const sendMessage = async (e) => {
    e.preventDefault();

    if (formValue === '') return alert('Please enter a message!')
    if (formValue.length > 1000) return alert('Message too long!')

    addDoc(msgRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid: auth.currentUser.uid,
      photoURl: auth.currentUser.photoURL
    })

    setFormValue('');
  }

  if (loading) {
    return <p>Loading...</p>;
  }
  else{
      
  }

  return (
    <div className='chat-container'>
      <div className='chat'>
        {messages &&
          messages.map(msg => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
      </div>
      <div ref={focusDiv}></div>

      <div className='new-msg'>
        <form onSubmit={sendMessage}>
          <input value={formValue} onChange={(e) => { setFormValue(e.target.value) }} />
          <button type="submit">🍳</button>
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
        <Header>
          <SignOut />
        </Header>
      </header>

      {user ? <ChatRoom /> : <SignIn />}
    </div>
  );
}

export default App;
