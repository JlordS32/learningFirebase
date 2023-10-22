import { auth, database } from '../firebaseConfig.ts';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

export const signUpUsers = async (email: string, password: string) => {
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
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error(error.message);
		} else {
			console.error('An unknown error occurred');
		}
	}
};

export const logInUsers = (email: string, password: string) => {
	try {
		toast.promise(signInWithEmailAndPassword(auth, email, password), {
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
