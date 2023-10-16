import React, {
	cloneElement,
	useEffect,
	useLayoutEffect,
	useState,
} from 'react';
import { app, database } from '../firebaseConfig.js';
import {
	collection,
	addDoc,
	getDocs,
	updateDoc,
	doc,
	deleteDoc,
	onSnapshot,
} from 'firebase/firestore';

import {
	getAuth,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
} from 'firebase/auth';

const App = () => {
	const [input, setInput] = useState({});
	const [data, setData] = useState([]);
	const [signedUser, setSignedUser] = useState([]);
	const collectionRef = collection(database, 'users');
	const auth = getAuth();

	const handleChange = (e) => {
		let newInput = {
			[e.target.name]: e.target.value,
		};

		setInput({
			...input,
			...newInput,
		});
	};

	const handleSignInOut = (e) => {
		let newUser = {
			[e.target.name]: e.target.value,
		};

		setSignedUser({
			...signedUser,
			...newUser,
		});
	};

	const handleSubmit = () => {
		addDoc(collectionRef, {
			email: input.email,
			password: input.password,
		})
			.then(() => {
				console.log('Data Added!');
			})
			.catch((error) => {
				console.error(error.message);
			});
	};

	const handleSignIn = () => {
		if (signedUser.email.trim() !== '' && signedUser.password.trim() !== '') {
			signInWithEmailAndPassword(auth, signedUser.email, signedUser.password);
		}
	};

	const handleSignOut = () => {
		signOut(auth);
	};

	const updateData = async (id, newValue) => {
		const docToUpdate = doc(database, 'users', id);

		updateDoc(docToUpdate, {
			email: newValue.email,
		})
			.then(() => {
				console.log('Data Updated!');
			})
			.catch((error) => {
				console.error(error.message);
			});
	};
	const deleteData = async (id) => {
		const docToUpdate = doc(database, 'users', id);

		deleteDoc(docToUpdate)
			.then(() => {
				console.log('Data Deleted!');
			})
			.catch((error) => {
				console.error(error.message);
			});
	};

	const getData = async () => {
		onSnapshot(collectionRef, (data) => {
			try {
				const fetchedData = data.docs.map((doc) => {
					return {
						id: doc.id,
						...doc.data(),
					};
				});

				setData(fetchedData);
			} catch (error) {
				console.error('Error fetching data: ', error).message;
			}
		});
	};

	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		onAuthStateChanged(auth, (data) => {
			if (data) {
				console.log('signed in');
			} else {
				console.log('not signed in');
			}
		});
	}, []);

	return (
		<div className='app-container'>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					gap: '10px 0',
					margin: '20px 0',
					outline: '1px black solid',
					padding: '40px',
				}}
			>
				<h1>Sign in</h1>
				<div>
					<input
						type='email'
						placeholder='Enter email here'
						onChange={handleSignInOut}
						name='email'
					/>
					<input
						type='password'
						placeholder='Enter email here'
						onChange={handleSignInOut}
						name='password'
					/>
				</div>
				<div
					style={{
						display: 'flex',
						width: '100%',
						justifyContent: 'center',
						gap: '0 10px',
					}}
				>
					<button
						style={{
							width: '30%',
						}}
						onClick={handleSignIn}
					>
						Sign in
					</button>
					<button
						style={{
							width: '30%',
						}}
                  onClick={handleSignOut}
					>
						Sign out
					</button>
				</div>
			</div>

			<div>
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
				<button onClick={handleSubmit}>Submit</button>
			</div>

			<div
				style={{
					display: 'flex',
					gap: '10px',
					width: '100%',
					flexWrap: 'wrap',
				}}
			>
				{data.map((item) => {
					return (
						<div
							className='item'
							style={{
								border: '1px solid black',
								width: '200px',
								textAlign: 'center',
							}}
							key={item.id}
						>
							<p>{item.email}</p>
							<p>{item.password}</p>
							<input
								type='email'
								name='email'
								placeholder='New Value'
								onChange={handleChange}
							/>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-around',
									padding: '10px',
								}}
							>
								<button onClick={() => updateData(item.id, input)}>
									Update
								</button>
								<button
									onClick={() => deleteData(item.id)}
									style={{
										backgroundColor: 'red',
										color: 'white',
										border: '0',
										borderRadius: '3px',
									}}
								>
									Delete
								</button>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default App;
