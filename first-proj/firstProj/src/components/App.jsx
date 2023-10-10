import React, { useEffect, useLayoutEffect, useState } from 'react';
import { app, database } from '../firebaseConfig.js';
import {
	collection,
	addDoc,
	getDocs,
	updateDoc,
	doc,
} from 'firebase/firestore';

const App = () => {
	const [input, setInput] = useState({});
	const [data, setData] = useState([]);
	const collectionRef = collection(database, 'users');

	const handleChange = (e) => {
		let newInput = {
			[e.target.name]: e.target.value,
		};

		setInput({
			...input,
			...newInput,
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

		getData();
	};

	const updateData = async (id, newValue) => {
		const docToUpdate = doc(database, 'users', id);

		updateDoc(docToUpdate, {
			email: newValue.email,
		})
			.then(() => {
				console.log('Data Updated!');
				getData();
			})
			.catch((error) => {
				console.error(error.message);
			});
	};

	const getData = async () => {
		try {
			const querySnapshot = await getDocs(collectionRef);

			const fetchedData = querySnapshot.docs.map((doc) => {
				return {
					id: doc.id,
					...doc.data(),
				};
			});

			setData(fetchedData);
		} catch (error) {
			console.error('Error fetching data: ', error);
		}
	};

	useLayoutEffect(() => {
		getData();
	}, []);

	return (
		<div className='app-container'>
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
                              borderRadius: '3px'
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
