import { auth, database } from '../firebaseConfig.ts';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	User,
} from 'firebase/auth';
import {
	collection,
	addDoc,
	doc,
	onSnapshot,
	Timestamp,
} from 'firebase/firestore';
import { toast } from 'react-toastify';

interface TodoType {
	userId: string;
	id: string;
	title: string;
	description: string;
	createdAt: string;
}

export const signUpUsers = async (
	email: string,
	password: string,
	close?: () => void
) => {
	const collectionRef = collection(database, 'users');

	try {
		const res = await toast.promise(
			createUserWithEmailAndPassword(auth, email, password),
			{
				pending: 'Signing up...',
				success: 'User signed up successfully 👌',
				error: 'Failed to sign up user 🤯',
			}
		);

		const userInfo = res.user;

		await addDoc(collectionRef, {
			userId: userInfo.uid,
			email: email,
		});

		if (close) {
			close();
		}
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error(error.message);
		} else {
			console.error('An unknown error occurred');
		}
	}
};

export const logInUsers = async (
	email: string,
	password: string,
	close?: () => void
) => {
	try {
		return toast.promise(signInWithEmailAndPassword(auth, email, password), {
			pending: 'Signing in...',
			success: 'User signed in successfully!',
			error: 'Invalid password! Try again uwu~',
		});
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error(error.message);
		} else {
			console.error('An unknown error occurred');
		}
	}
};

export const signOutUser = () => {
	try {
		return toast.promise(signOut(auth), {
			pending: 'Signing out...',
			success: 'User signed out successfully!',
			error: 'An error occurred while signing out.',
		});
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error(error.message);
		} else {
			console.error('An unknown error occurred');
		}
	}
};

export const addTodoData = (
	userId: string,
	id: string,
	title: string = '',
	description: string = ''
) => {
	const collectionRef = collection(database, 'todos', userId, 'todoOwner');

	return toast.promise(
		addDoc(collectionRef, {
			userId: userId,
			id: id,
			title: title,
			description: description,
			createdAtTimeStamp: Timestamp.now(),
		}),
		{
			pending: 'Adding todo...',
			success: 'Todo added successfully!',
			error: 'An error occurred while a	dding your todo please try again!',
		}
	);
};

export const getTodoData = async (currentUser: User) => {
	const collectionRef = collection(
		database,
		'todos',
		currentUser.uid,
		'todoOwner'
	);

	return new Promise((resolve, reject) => {
		onSnapshot(collectionRef, (data) => {
			try {
				const fetchedData = data.docs.map((doc) => {
					return {
						...doc.data(),
					};
				});

				// Sort the fetchedData array by timestamp in ascending order
				fetchedData.sort((a, b) => a.createdAtTimeStamp - b.createdAtTimeStamp);

				resolve(fetchedData);
			} catch (error: unknown) {
				console.error('Error fetching data: ', error);
				reject(error);
			}
		});
	});
};
