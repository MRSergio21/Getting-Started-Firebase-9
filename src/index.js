import { initializeApp } from 'firebase/app';
import { getFirestore, collection, onSnapshot, deleteDoc, doc, addDoc, query, where, orderBy, serverTimestamp, getDoc, updateDoc } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyCl5TBx0CAnGK8TDOLDvm9ezpNL_8kfOqE",
    authDomain: "firststep-52c3b.firebaseapp.com",
    projectId: "firststep-52c3b",
    storageBucket: "firststep-52c3b.appspot.com",
    messagingSenderId: "110246368829",
    appId: "1:110246368829:web:1b7a9cc6fb1cab26597c54"
};

initializeApp(firebaseConfig)

const db = getFirestore()
const auth = getAuth()

const colRef = collection(db, 'books')

const q = query(colRef, orderBy('createdAt'));

onSnapshot(q, (snapshot) => {
    const books = []
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books)
})

const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colRef, {
        tittle: addBookForm.tittle.value,
        author: addBookForm.author.value,
        createdAt: serverTimestamp()
    })
    .then(() => {
        addBookForm.reset();
    })
})

const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'books', deleteBookForm.id.value);
    deleteDoc(docRef)
        .then(() => {
            deleteBookForm.reset();
        })
})

const updateBookForm = document.querySelector('.update')
updateBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'books', updateBookForm.id.value)
    updateDoc(docRef, {
        tittle: 'updated tittle'
    })
    .then(() => {
        updateBookForm.reset()
    })

})

const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = signupForm.email.value
    const password = signupForm.password.value

    createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            // console.log('user created:', cred.user)
            signupForm.reset()
        })
        .catch((err) => {
            console.log(err.message)
        })
})

const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
    signOut(auth)
    .then(() => {
        // console.log('The user singned out')
    })
    .catch((e) => {
        console.log(err.mesagge)
    })
})

const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = loginForm.email.value
    const password = loginForm.password.value

    signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
        // console.log('User logged in: ', cred.user)
    })
    .catch((err) => {
        console.log(err.mesagge)
    })
})

onAuthStateChanged(auth, (user) => {
    console.log('User status changed:', user)
})