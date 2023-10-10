import React, { useState } from 'react';
import { app, database } from '../firebaseConfig.js';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
} from 'firebase/auth';

const App = () => {
	const auth = getAuth();
	const googleProvider = new GoogleAuthProvider();
	const [data, setData] = useState({});

	const handleChange = (e) => {
		let newInput = {
			[e.target.name]: e.target.value,
		};

		setData({
			...data,
			...newInput,
		});
	};

	const handleSignUp = () => {
		createUserWithEmailAndPassword(auth, data.email, data.password)
			.then((res) => {
				const user = res.user;

				console.log(user);
			})
			.catch((error) => {
				alert(error.message);
			});
	};

	const handleSignIn = () => {
		signInWithEmailAndPassword(auth, data.email, data.password)
			.then((res) => {
				console.log('signed in');

				console.log(user);
			})
			.catch((error) => {
				alert(error.message);
			});
	};

	const handleSignInPopup = () => {
		signInWithPopup(auth, googleProvider)
			.then((res) => {
				console.log(res.user);
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	return (
		<div className='app-container'>
			<div>
				<h1>Sign up</h1>
				<input
					type='email'
					name='email'
					placeholder='Email'
					onChange={handleChange}
				/>
				<input
					type='Password'
					name='password'
					placeholder='Password'
					onChange={handleChange}
				/>
				<button onClick={handleSignUp}>Submit</button>
			</div>
			<div>
				<h1>Sign in</h1>
				<input
					type='email'
					name='email'
					placeholder='Email'
					onChange={handleChange}
				/>
				<input
					type='Password'
					name='password'
					placeholder='Password'
					onChange={handleChange}
				/>
				<button onClick={handleSignIn}>Submit</button>
			</div>
			<div>
				<button onClick={handleSignInPopup}>Sign in with google</button>
			</div>
		</div>
	);
};

export default App;
