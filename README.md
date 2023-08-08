# StirFry - Simple Chat App with React and Firebase

StirFry is a user-friendly chat application built using React and Firebase, designed to provide a seamless and secure communication experience. This project demonstrates the integration of Firebase's authentication and Firestore database services to create a real-time chat platform.

> ps: users are not friendly.
## Features

- **User Authentication:** Securely register and log in to your StirFry account using Firebase Authentication.

- **Real-time Messaging:** Enjoy instant messaging with friends and colleagues in a real-time environment.

- **User Profiles:** Personalize your account by uploading a profile picture and setting a display name.

- **Message History:** Scroll through the latest 30 messages of global conversations.

## Demo

Check out the live demo of StirFry: [StirFry Live Demo](https://stir-dry.web.app)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/SujalChoudhari/StirFry.git
   ```

2. Navigate to the project directory:
   ```bash
   cd StirFry
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a Firebase project and set up authentication and Firestore.

5. Update Firebase configuration in `src/App.js`:
   ```javascript
   const firebaseConfig = {
     apiKey: 'YOUR_API_KEY',
     authDomain: 'YOUR_AUTH_DOMAIN',
     projectId: 'YOUR_PROJECT_ID',
     storageBucket: 'YOUR_STORAGE_BUCKET',
     messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
     appId: 'YOUR_APP_ID',
   };

   // Initialize Firebase
   const app = initializeApp(firebaseConfig);

    // OR UPDATE THE .env FILE 

   ```

6. Run the app:
   ```bash
   npm run start
   ```

## Contributions and License

Thank you for your interest in StirFry! This project is not open for external contributions at the moment. You are welcome to fork the repository and modify it for your own use.
This project is not licensed and is intended for educational and personal purposes.

## Contact

For any inquiries or feedback, please contact the project maintainer:

Sujal Choudhari
LinkedIn: [@Sujal Choudhari](https://www.linkedin.com/in/sujalchoudhari)
