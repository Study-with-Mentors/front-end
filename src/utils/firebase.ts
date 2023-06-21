// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAX5lTCztle_R4Mgk2ZISzsU6aelemMEt8",
  authDomain: "cuteness-bd66c.firebaseapp.com",
  projectId: "cuteness-bd66c",
  storageBucket: "cuteness-bd66c.appspot.com",
  messagingSenderId: "425988267568",
  appId: "1:425988267568:web:4c382f2d30167f57d2d7f5",
  measurementId: "G-TDPDQBMMV0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const uploadImage = async (image: any) => {
  const imageRef = ref(storage, `images/${image.name + v4()}`);

  return await uploadBytes(imageRef, image)
    .then((value) => {
      return getDowloadUrlByRef(value?.ref);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getDowloadUrlByRef = async (ref: any) => {
  try {
    const res = await getDownloadURL(ref);
    return res;
  } catch (error) {
    console.log(error);
  }
};
