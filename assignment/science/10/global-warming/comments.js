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
const stars = document.querySelectorAll(".star");
const rating = document.getElementById("rating");
const reviewText = document.getElementById("review");
const submitBtn = document.getElementById("submit");
const reviewsContainer = document.getElementById("reviews");

stars.forEach((star) => {
	star.addEventListener("click", () => {
		const value = parseInt(star.getAttribute("data-value"));
		rating.innerText = value;

		// Remove all existing classes from stars
		stars.forEach((s) => s.classList.remove("one", 
												"two", 
												"three", 
												"four", 
												"five"));

		// Add the appropriate class to 
		// each star based on the selected star's value
		stars.forEach((s, index) => {
			if (index < value) {
				s.classList.add(getStarColorClass(value));
			}
		});

		// Remove "selected" class from all stars
		stars.forEach((s) => s.classList.remove("selected"));
		// Add "selected" class to the clicked star
		star.classList.add("selected");
	});
});

submitBtn.addEventListener("click", () => {
	const review = reviewText.value;
	const userRating = parseInt(rating.innerText);

	if (!userRating || !review) {
		alert(
"Please select a rating and provide a review before submitting."
			);
		return;
	}

	if (userRating > 0) {
		const reviewElement = document.createElement("div");
		reviewElement.classList.add("review");
		reviewElement.innerHTML = 
`<p><strong>Rating: ${userRating}/5</strong></p><p>${review}</p>`;
		reviewsContainer.appendChild(reviewElement);

		// Reset styles after submitting
		reviewText.value = "";
		rating.innerText = "0";
		stars.forEach((s) => s.classList.remove("one", 
												"two", 
												"three", 
												"four", 
												"five", 
												"selected"));
	}
});

function getStarColorClass(value) {
	switch (value) {
		case 1:
			return "one";
		case 2:
			return "two";
		case 3:
			return "three";
		case 4:
			return "four";
		case 5:
			return "five";
		default:
			return "";
	}
}