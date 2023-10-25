import { auth, database, provider, storage } from '../firebaseConfig.ts';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	User,
	signInWithPopup,
} from 'firebase/auth';
import {
	collection,
	addDoc,
	setDoc,
	onSnapshot,
	Timestamp,
	doc,
	deleteDoc,
	updateDoc,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-toastify';

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
				error: {
					render({ data }) {
						if (data && typeof data === 'object' && 'code' in data) {
							switch (data.code) {
								case 'auth/email-already-in-use':
									return 'Email is already in use. Please use a different email.';
								case 'auth/invalid-email':
									return 'Invalid email address';
								case 'auth/weak-password':
									return 'Password is too weak mate. Be strong, STAY HARD!';
								default:
									return 'An error occurred while signing up. Please try again later.';
							}
						}
					},
				},
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

export const signWithGoogle = async () => {
	try {
		return toast.promise(signInWithPopup(auth, provider), {
			pending: 'Signing in...',
			success: 'User signed in successfully 👌',
			error: 'Failed to sign in user 🤯',
		});
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error(error.message);
		} else {
			console.error('An unknown error occurred');
		}
	}
};

export const logInUsers = async (email: string, password: string) => {
	try {
		return toast.promise(signInWithEmailAndPassword(auth, email, password), {
			pending: 'Signing in...',
			success: 'User signed in successfully!',
			error: {
				render({ data }) {
					// When the promise reject, data will contains the error
					if (data instanceof Error) {
						return data?.message;
					}
				},
			},
		});
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error(error.message);
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
	const collectionRef = doc(database, 'todos', userId, 'todoOwner', id);

	return toast.promise(
		setDoc(collectionRef, {
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

export const updateTodoData = (
	userId: string,
	id: string,
	title: string,
	description: string
) => {
	const collectionRef = doc(database, 'todos', userId, 'todoOwner', id);

	return toast.promise(
		updateDoc(collectionRef, {
			title: title,
			description: description,
		}),
		{
			pending: 'Updating todo...',
			success: 'Todo updated successfully!',
			error: 'An error occurred while updating your todo!',
		}
	);
};

export const deleteTodoData = (userId: string, id: string) => {
	const docToUpdate = doc(database, `todos/${userId}/todoOwner/${id}`);

	return toast.promise(deleteDoc(docToUpdate), {
		pending: 'Deleting todo...',
		success: 'Todo deleted successfully!',
		error: 'An error occurred while a	dding your todo please try again!',
	});
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

export const submitProfilePicture = async (
	submittedProfilePicture: File,
	currentUser: User
) => {
	const storageRef = ref(
		storage,
		`${currentUser.uid}/profilePicture/profilePicture.jpg`
	);

	return toast.promise(uploadBytes(storageRef, submittedProfilePicture), {
		pending: 'Uploading...',
		success: 'Profile picture uploaded!',
		error: 'An error occurred while uploading!',
	});
};

export const getProfilePictureURL = async (currentUser: User) => {
	const storageRef = ref(
		storage,
		`${currentUser.uid}/profilePicture/profilePicture.jpg`
	);

	return new Promise(async (resolve, reject) => {
		try {
			const url = await getDownloadURL(storageRef);
			resolve(url);
		} catch (error: unknown) {
			console.error('Error fetching data: ', error);
			reject(error);
		}
	});
};
