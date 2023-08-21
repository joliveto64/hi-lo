import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCbU7aZ2H274Hx9uX0Jy0ZC5j_Sgo3aj1k",
  authDomain: "playground-4acae.firebaseapp.com",
  databaseURL: "https://playground-4acae-default-rtdb.firebaseio.com",
  projectId: "playground-4acae",
  storageBucket: "playground-4acae.appspot.com",
  messagingSenderId: "401660377181",
  appId: "1:401660377181:web:02a052888c389475d435b4",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };

// useEffect(() => {
//   function initDatabase() {
//     if (isOnline) {
//       db.ref("/gameState").set(gameState);
//       db.ref("/dice").set(dice);
//     }

//     setIsInitialized(true);
//   }
//   initDatabase();
// }, []);
