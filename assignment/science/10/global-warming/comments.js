import { initializeApp } from 
"https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getDatabase,  ref,  push,  onChildAdded
} from 
"https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCF-Jzn0XA743fPJWEGs8jUQNZP7dPcQtA",
  authDomain: "lidyapradina-git.firebaseapp.com",
  projectId: "lidyapradina-git",
  storageBucket: "lidyapradina-git.firebasestorage.app",
  messagingSenderId: "1061186178712",
  appId: "1:1061186178712:web:f32f7001fcfb19942a0aed"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const commentsRef = ref(db, "comments");

window.postComment = function() {

  const name = document.getElementById("name").value;
  const comment = document.getElementById("comment").value;

  push(commentsRef, {
    name: name,
    text: comment,
    timestamp: Date.now()
  });

}
onChildAdded(commentsRef, (data) => {

  const comment = data.val();

  const div = document.createElement("div");

  div.innerHTML =
    "<b>" + comment.name + "</b>: " +
    comment.text;

  document.getElementById("comments")
    .appendChild(div);

});