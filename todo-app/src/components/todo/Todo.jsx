import React, { useEffect, useLayoutEffect, useState } from 'react';
import Todos from './Todos';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import { app, database } from '../../firebaseConfig';
import {
	collection,
	addDoc,
	getDocs,
	updateDoc,
	deleteDoc,
	doc,
} from 'firebase/firestore';

const Todo = () => {
	const [input, setInput] = useState([]);
	const [todo, setTodo] = useState([]);
	const [todoData, setTodoData] = useState([]);

	const collectionRef = collection(database, 'todo');
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
		setTodo((prevTodo) => {
			if (
				prevTodo.title === input.title &&
				prevTodo.content === input.content
			) {
				console.log('data is the same');
				return prevTodo; // Return the previous state without updating
			}

			return {
				title: input.title ? input.title : '',
				content: input.content ? input.content : '',
			};
		});

		console.log(input.title, input.content);

		addTodoData(input.title, input.content);
	};

	const addTodoData = (title, content) => {
		addDoc(collectionRef, {
			title: title,
			content: content,
		})
			.then(() => {
				console.log('Data Added!');
			})
			.catch((error) => {
				console.error(error.message);
			});

		getTodoData();
	};

	const getTodoData = async () => {
		try {
			const querySnapshot = await getDocs(collectionRef);

			const fetchedData = querySnapshot.docs.map((doc) => {
				return {
					id: doc.id,
					...doc.data(),
				};
			});

			setTodoData(fetchedData);
		} catch (error) {
			console.error('Error fetching data: ', error.message);
		}
	};

	useLayoutEffect(() => {
		getTodoData();
	});

	useEffect(() => {
		getTodoData();
		console.log(todoData);
	}, [todo]);

	return (
		<div className='todo-container d-flex flex-column pt-5 align-items-center'>
			<h1>Todos!</h1>
			<Form
				className='px-3 py-3'
				style={{
					width: 'clamp(500px, 90%, 720px)',
				}}
			>
				<Form.Group
					className='mb-3'
					controlId='exampleForm.ControlTextarea1'
				>
					<Form.Control
						as='input'
						rows={3}
						placeholder='Add title...'
						defaultValue={''}
						className='mb-3'
						name='title'
						onChange={handleChange}
					/>
					<Form.Control
						as='textarea'
						rows={3}
						placeholder='Add a new todo here...'
						name='content'
						style={{
							resize: 'none',
						}}
						onChange={handleChange}
					/>
				</Form.Group>

				<Button
					className='bg-dark border-dark'
					onClick={handleSubmit}
				>
					Submit
				</Button>
			</Form>

			{/* <Todos /> */}
		</div>
	);
};

export default Todo;
