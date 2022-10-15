import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyB5J0mobKQdL2_tXomDaZRRFDKhGqqX_HI",
  authDomain: "meuapp-dba4e.firebaseapp.com",
  databaseURL: "https://meuapp-dba4e-default-rtdb.firebaseio.com",
  projectId: "meuapp-dba4e",
  storageBucket: "meuapp-dba4e.appspot.com",
  messagingSenderId: "476125397033",
  appId: "1:476125397033:web:38ab52f3baa37dca2d1c38",
  measurementId: "G-VVQK5B3FJR"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
