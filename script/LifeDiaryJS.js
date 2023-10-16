// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";
import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyB8YVca20cNbEh-__VweJVnNib4hSWZePU",
	authDomain: "myweb-fded4.firebaseapp.com",
	databaseURL: "https://myweb-fded4-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "myweb-fded4",
	storageBucket: "myweb-fded4.appspot.com",
	messagingSenderId: "70705417006",
	appId: "1:70705417006:web:dcf1c6df166b27487c88bf",
	measurementId: "G-HK77CJ2LFK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const certificateCollection = collection(db, "LifeDiary");

getDocs(query(certificateCollection, orderBy("date", "asc"))).then((querySnapshot) => {
  create('https://firebasestorage.googleapis.com/v0/b/myweb-fded4.appspot.com/o/LifeDiary%2FFrontCover.png?alt=media&token=b164be56-a52e-454a-9c87-0f0a45deb7f1');
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const formattedDate = formatFirestoreDate(data.date.toDate()); // Assuming "date" is a Firestore Timestamp
    const name = data.name;
    const image = data.image;
    const text = data.text;

	createPage(name, image, formattedDate, text)
  });
  
  create('https://firebasestorage.googleapis.com/v0/b/myweb-fded4.appspot.com/o/LifeDiary%2FBackCover.png?alt=media&token=eefcdffe-75a0-4da9-8df2-c43a3174ff2c');
  
  var pagess = document.getElementsByClassName('page');
  for(var i = 0; i < pagess.length; i++)
  {
    var page = pagess[i];
    if (i % 2 === 0)
    {
      page.style.zIndex = (pagess.length - i);
    }
  }

	for(var i = 0; i < pagess.length; i++)
	{
	  //Or var page = pages[i];
	  pagess[i].pageNum = i + 1;
	  pagess[i].onclick=function()
	  {
		if (this.pageNum % 2 == 0)
		{
		  this.classList.remove('flipped');
		  this.previousElementSibling.classList.remove('flipped');
		}
		else
		{
		  this.classList.add('flipped');
		  this.nextElementSibling.classList.add('flipped');
		}
	  }
	}
});

// Function to format Firestore date to "XX年XX月XX日"
function formatFirestoreDate(date) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return date.toLocaleDateString('zh-TW', options);
}

function create(url){
	// Create a new div element
	var pageDiv = document.createElement("div");

	// Add the "page" class to the div
	pageDiv.classList.add("page");

	// Set the background image using the style attribute
	pageDiv.style.backgroundImage = "url(" + url + ")";
	
	var pagesContainer = document.querySelector(".pages");
	pagesContainer.appendChild(pageDiv);
}

// Function to create a page element with given content and image
function createPage(name, imgSrc, formattedDate, text) {
  // Create a new div element for the page
  var pageDiv = document.createElement("div");
  pageDiv.classList.add("page");
  
  // Create an image element with the background image
  pageDiv.style.backgroundImage = `url(${'https://firebasestorage.googleapis.com/v0/b/myweb-fded4.appspot.com/o/LifeDiary%2FLeft.jpg?alt=media&token=fd91cd70-32e6-44eb-aafc-f324c687ea3e'})`;
  
  // Create an h2 element for the name
  var nameElement = document.createElement("h2");
  nameElement.textContent = name;

  // Create an img element for the image
  var imgElement = document.createElement("img");
  imgElement.classList.add("page-img");
  imgElement.src = imgSrc;
  
  pageDiv.appendChild(nameElement);
  pageDiv.appendChild(imgElement);
  
  var pageDiv2 = document.createElement("div");
  pageDiv2.classList.add("page");
  
  pageDiv2.style.backgroundImage = `url(${'https://firebasestorage.googleapis.com/v0/b/myweb-fded4.appspot.com/o/LifeDiary%2FRight.jpg?alt=media&token=f3d2f55d-504c-4dea-9890-fe7107410bb3'})`;

  // Create a div element for the text
  var textElement = document.createElement("span");
  textElement.innerHTML = `${formattedDate}<br>${text}`;

  pageDiv2.appendChild(textElement);

  // Append the pageDiv to your desired container
  var pagesContainer = document.querySelector(".pages");
  pagesContainer.appendChild(pageDiv);
  pagesContainer.appendChild(pageDiv2);
}