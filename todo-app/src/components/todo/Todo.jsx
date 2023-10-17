import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
import Todos from './Todos';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import { app, database } from '../../firebaseConfig';
import {
	collection,
	addDoc,
	onSnapshot,
	updateDoc,
	deleteDoc,
	doc,
	Timestamp,
} from 'firebase/firestore';
import { toast } from 'react-toastify';

const Todo = () => {
	const [input, setInput] = useState([]);
	const [todo, setTodo] = useState([]);
	const [todoData, setTodoData] = useState([]);

	const titleInputRef = useRef();
	const contentInputRef = useRef();

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
		setTodo(input);
		const currentTime = Timestamp.now();

		if (input.title || input.content) {
			addTodoData(input.title, input.content, currentTime);
		}

		contentInputRef.current.value = '';
		titleInputRef.current.value = '';

		setInput({
			title: '',
			content: '',
		});
	};

	const deleteTodo = (id) => {
		const docToUpdate = doc(database, 'todo', id);

		deleteDoc(docToUpdate)
			.then(() => {
				console.log('Data has been delete!');
			})
			.catch((error) => {
				console.error(error.message);
			});

		getTodoData();

		toast.error('Todo delete!', {
			position: 'top-center',
			theme: 'dark'
		});
	};

	const updateTodo = (id, title, content) => {
		const docToUpdate = doc(database, 'todo', id);

		updateDoc(docToUpdate, {
			title: title,
			content: content,
		})
			.then(() => {
				console.log('Data has been updated!');
				toast.success('Todo has been updated!', {
					position: 'top-center',
					theme: 'dark'
				});
			})
			.catch((error) => {
				console.error(error.message);
				toast.error('Todo update failed! :(', {
					position: 'top-center',
					theme: 'dark'
				});
			});

		getTodoData();
	};

	const addTodoData = (title = '', content = '', currentTime) => {

		addDoc(collectionRef, {
			title: title,
			content: content,
			createdAtTimeStamp: currentTime,
		})
			.then(() => {
				console.log('Data Added!');
			})
			.catch((error) => {
				console.error(error.message);
			});

		getTodoData();
		toast.success('Todo added!', {
			position: 'top-center',
			theme: 'dark'
		});
	};

	// ...

	const getTodoData = async () => {
		onSnapshot(collectionRef, (data) => {
			try {
				const fetchedData = data.docs.map((doc) => {
					return {
						id: doc.id,
						...doc.data(),
					};
				});

				// Sort the fetchedData array by timestamp in ascending order
				fetchedData.sort((a, b) => a.createdAtTimeStamp - b.createdAtTimeStamp);

				setTodoData(fetchedData);
			} catch (error) {
				console.error('Error fetching data: ', error.message);
			}
		});
	};

	// ...

	useEffect(() => {
		getTodoData();
	}, [todo]);

	return (
		<div className='todo-container d-flex flex-column pt-5 align-items-center'>
			<h1>Todos!</h1>
			<Form
				className='px-3 py-3'
				style={{
					width: 'clamp(300px, 90%, 720px)',
				}}
			>
				<Form.Group className='mb-3'>
					<Form.Control
						as='input'
						rows={3}
						placeholder='Add title...'
						defaultValue={''}
						className='mb-3'
						name='title'
						onChange={handleChange}
						ref={titleInputRef}
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
						ref={contentInputRef}
					/>
				</Form.Group>

				<Button
					className='bg-dark border-dark'
					onClick={handleSubmit}
				>
					Submit
				</Button>
			</Form>

			<Todos
				todos={todoData}
				deleteTodo={deleteTodo}
				updateTodo={updateTodo}
			/>
		</div>
	);
};

export default Todo;
