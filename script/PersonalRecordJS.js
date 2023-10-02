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
const certificateCollection = collection(db, "Certificate");

getDocs(query(certificateCollection, orderBy("date", "asc"))).then((querySnapshot) => {
  const shelfFlexElements = document.querySelectorAll('.shelf-flex');
  const shelfFlexArray = Array.from(shelfFlexElements);
  const shelfFlexElementsExcludingLast = shelfFlexArray.slice(0, -1);

  let dataIndex = 0;

  shelfFlexElementsExcludingLast.forEach((shelfFlex) => {
    const verticalRecord1 = document.createElement('div');
    const verticalRecord2 = document.createElement('div');
    let className1 = 'vertical-record';
    let className2 = 'vertical-record';

    if (dataIndex < querySnapshot.size) {
      const img1 = document.createElement('img');
      const img2 = document.createElement('img');

      const data1 = querySnapshot.docs[dataIndex].data();
      img1.src = data1.image;

      dataIndex++;

      if (dataIndex < querySnapshot.size) {
        const data2 = querySnapshot.docs[dataIndex].data();
        img2.src = data2.image;
        dataIndex++;
      }

      if (data1.type === true) {
        className1 = 'vertical-record';
      } else {
        className1 = 'horizontal-record';
      }

      if (dataIndex < querySnapshot.size) {
        const data2 = querySnapshot.docs[dataIndex].data();
        if (data2.type === true) {
          className2 = 'vertical-record';
        } else {
          className2 = 'horizontal-record';
        }
      }

      verticalRecord1.className = className1;
      verticalRecord2.className = className2;

      verticalRecord1.appendChild(img1);
      verticalRecord2.appendChild(img2);

      shelfFlex.appendChild(verticalRecord1);
      shelfFlex.appendChild(verticalRecord2);
    }
  });
  
  const images = document.querySelectorAll('img');
  const overlay = document.getElementById('overlay');
  const overlayImage = document.getElementById('overlay-image');
  const closeButton = document.getElementById('close-button');
  const nameElement = document.getElementById('name');

  images.forEach((img) => {
    img.addEventListener('click', function () {
	  const imageSrc = this.src;
      const data = querySnapshot.docs.find(doc => doc.data().image === imageSrc).data(); 
      nameElement.textContent = data.name;
      overlay.style.display = 'block';
      overlayImage.src = this.src;
    });
  });

  closeButton.addEventListener('click', function () {
    overlay.style.display = 'none';
  });
  
  const leftArrow = document.getElementById('left-arrow');
  const rightArrow = document.getElementById('right-arrow');

  let currentIndex = 0; // 用于跟踪当前显示的数据索引

  leftArrow.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex-=6;
	  clearShelfFlexElements();
      updateDisplay();
    }
  });

  rightArrow.addEventListener('click', () => {
    if (currentIndex < querySnapshot.size - 6) {
      currentIndex+=6;
	  clearShelfFlexElements();
      updateDisplay();
    }
  });

  function updateDisplay() {
	shelfFlexElementsExcludingLast.forEach((shelfFlex, index) => {
	  if (currentIndex + index * 2 < querySnapshot.size) {
		const verticalRecord1 = document.createElement('div');
		const verticalRecord2 = document.createElement('div');
		let className1 = 'vertical-record';
		let className2 = 'vertical-record';

		const data1 = querySnapshot.docs[currentIndex + index * 2].data();
		const img1 = document.createElement('img');
		img1.src = data1.image;
		verticalRecord1.appendChild(img1);

		const data2 = querySnapshot.docs[currentIndex + index * 2 + 1].data();
		const img2 = document.createElement('img');
		img2.src = data2.image;
		verticalRecord2.appendChild(img2);

		if (data1.type === true) {
		  className1 = 'vertical-record';
		} else {
		  className1 = 'horizontal-record';
		}

		if (data2.type === true) {
		  className2 = 'vertical-record';
		} else {
		  className2 = 'horizontal-record';
		}

		verticalRecord1.className = className1;
		verticalRecord2.className = className2;

		shelfFlex.appendChild(verticalRecord1);
		shelfFlex.appendChild(verticalRecord2);
      }
    });
  }
  
  function clearShelfFlexElements() {
	  shelfFlexElementsExcludingLast.forEach((shelfFlex) => {
      while (shelfFlex.firstChild) {
        shelfFlex.removeChild(shelfFlex.firstChild);
	  }
    });
  }
});
