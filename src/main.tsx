import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6q5Q3R7d1iB2UMR1p6tiSMrqwIO367pc",
  authDomain: "coffee-shop-58f1e.firebaseapp.com",
  projectId: "coffee-shop-58f1e",
  storageBucket: "coffee-shop-58f1e.appspot.com",
  messagingSenderId: "931609471296",
  appId: "1:931609471296:web:6056ddeea689fa8e1732a5",
};

// Initialize Firebase
// @ts-nocheck
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
