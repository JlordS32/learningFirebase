import React, { useEffect, useLayoutEffect, useState } from 'react';
import { app, storage } from '../firebaseConfig.js';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const App = () => {
	const [data, setData] = useState({});
  

	const handleSubmit = () => {
      const storageRef = ref(storage, `images/${data.name}`);
		const uploadTask = uploadBytesResumable(storageRef, data);

		uploadTask.on(
			'state_changed',
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;

				console.log('Upload is ', +progress + '% done');
			},
			(error) => {
				console.log(error.message);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					console.log('File is available at ', downloadURL);
				});
			}
		);
	};

	return (
		<div
			className='app-container'
			style={{
				display: 'flex',
				flexDirection: 'column',
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
			}}
		>
			<div
				style={{
					display: 'flex',
					gap: '10px',
				}}
			>
				<input
					type='file'
					name='password'
					placeholder='Password'
					onChange={(event) => setData(event.target.files[0])}
					style={{
						padding: '10px 40px',
						border: '1px black solid',
					}}
				/>
			</div>

			<button
				onClick={handleSubmit}
				style={{
					border: '0',
					backgroundColor: 'black',
					width: '50%',
					color: 'white',
					padding: '1rem',
					margin: '2rem 0',
					borderRadius: '10px',
					alignSelf: 'center',
				}}
			>
				Submit
			</button>
		</div>
	);
};

export default App;
