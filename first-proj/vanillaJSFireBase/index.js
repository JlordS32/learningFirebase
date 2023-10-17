// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js';
import {
	getAuth,
	createUserWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js';
import {
	getFirestore,
	onSnapshot,
	collection,
	addDoc,
} from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCOHEHxwprlUDJOUE4cGrYZz2mwhjhPGuM',
	authDomain: 'vanilla-js-test-7225a.firebaseapp.com',
	projectId: 'vanilla-js-test-7225a',
	storageBucket: 'vanilla-js-test-7225a.appspot.com',
	messagingSenderId: '623675741234',
	appId: '1:623675741234:web:76e463bb86e23f0dff982b',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const collectionRef = collection(db, 'todo');

const register = () => {
	const email = document.getElementsByClassName('email');
	const password = document.getElementsByClassName('password');

	const submitBtn = document.querySelector('.main button');

	submitBtn.addEventListener('click', () => {
		createUserWithEmailAndPassword(auth, email.value, password.value)
			.then((res) => {
				console.log(res.user);
			})
			.catch((err) => {
				console.error(err);
			});
	});
};

const getData = async () => {
	return new Promise((resolve, reject) => {
		onSnapshot(collectionRef, (data) => {
			try {
				const fetchedData = data.docs.map((doc) => {
					return {
						id: doc.id,
						...doc.data(),
					};
				});

				resolve(fetchedData);
			} catch (err) {
				reject(error);
			}
		});
	});
};

const updateTodoList = async () => {
	try {
		const data = await getData();
		const todoContainer = document.querySelector('.todos');
		// Clear the existing todos
		todoContainer.innerHTML = '';
		data.forEach((item) => {
			const todoElement = document.createElement('div');
			todoElement.classList.add('todo');
			todoElement.setAttribute('data-id', item.id);
			todoElement.textContent = item.todo;
			todoContainer.appendChild(todoElement);
		});
	} catch (err) {
		console.error('Error updating todo list: ', err.message);
	}
};

const createNewTodoBtn = document.querySelector('.create-new-todo button ');
const newTodo = document.querySelector('.create-new-todo input ');

createNewTodoBtn.addEventListener('click', async () => {
	if (newTodo.value.trim() !== '') {
		addDoc(collectionRef, {
			todo: newTodo.value,
		})
			.then(() => {
				console.log('Data Added');

				updateTodoList();
			})
			.catch((err) => {
				console.error('Error handling this shit: ', err.message);
			});
	}
});

// Initial update when the page loads
updateTodoList();

register();
