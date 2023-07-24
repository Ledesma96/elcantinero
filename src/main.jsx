import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD43e63jHnKDZFU7opdVsQKlY8xWWxDhE4",
  authDomain: "el-cantinero1.firebaseapp.com",
  projectId: "el-cantinero1",
  storageBucket: "el-cantinero1.appspot.com",
  messagingSenderId: "188985544814",
  appId: "1:188985544814:web:28d9813a1a41be2ca0567f"
};

// Initialize Firebase
initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
