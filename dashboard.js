import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut }
  from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getDatabase, ref, set, push, onValue }
  from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyA59_22O4f1yu3EsUETIIRo2EoBO6f6mhk",
  authDomain: "health-tracker-3da07.firebaseapp.com",
  projectId: "health-tracker-3da07",
  storageBucket: "health-tracker-3da07.appspot.com",
  databaseURL: "https://health-tracker-3da07-default-rtdb.firebaseio.com",
  messagingSenderId: "1032034716393",
  appId: "1:1032034716393:web:2249b14d5bb0cf3c2e7e78"
};


// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Track Auth State
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html"; // redirect if not logged in
  }
});

// Save Health Data
document.getElementById("trackerForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const steps = document.getElementById("steps").value;
  const water = document.getElementById("water").value;
  const sleep = document.getElementById("sleep").value;

  const user = auth.currentUser;
  if (user) {
    const dataRef = push(ref(db, "users/" + user.uid + "/healthData"));
    set(dataRef, {
      steps,
      water,
      sleep,
      timestamp: new Date().toISOString()
    });
  }
});

// Display Health Data in Real-time
const user = auth.currentUser;
onAuthStateChanged(auth, (user) => {
  if (user) {
    const listRef = ref(db, "users/" + user.uid + "/healthData");
    onValue(listRef, (snapshot) => {
      const data = snapshot.val();
      const list = document.getElementById("progressList");
      list.innerHTML = "";
      for (let id in data) {
        let item = data[id];
        list.innerHTML += `<li>
          Steps: ${item.steps}, Water: ${item.water} L, Sleep: ${item.sleep} hrs
        </li>`;
      }
    });
  }
});

// Logout
window.logout = function() {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
};
