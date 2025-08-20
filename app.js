// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut }
  from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

// Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyA59_22O4f1yu3EsUETIIRo2EoBO6f6mhk",
  authDomain: "health-tracker-3da07.firebaseapp.com",
  projectId: "health-tracker-3da07",
  storageBucket: "health-tracker-3da07.appspot.com",
  messagingSenderId: "1032034716393",
  appId: "1:1032034716393:web:2249b14d5bb0cf3c2e7e78"
};


// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Signup
window.signup = function() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      document.getElementById("message").innerText = "Signup successful!";
    })
    .catch(err => {
      document.getElementById("message").innerText = err.message;
    });
};

// Login
window.login = function() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch(err => {
      document.getElementById("message").innerText = err.message;
    });
};

// Logout (used in dashboard.js too)
window.logout = function() {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
};

