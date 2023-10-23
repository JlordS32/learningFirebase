import { auth, database } from '../firebaseConfig.ts';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

interface TodoType {
	userId: string;
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

export const signOutUser = async () => {
	try {
		await toast.promise(signOut(auth), {
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

export const addNewTodo = async () => {

}
