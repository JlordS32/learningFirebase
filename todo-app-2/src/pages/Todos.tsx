import { useEffect, useState, useRef } from 'react';

// components
import Todo from '../components/Todo';

// libraries
import { useAutoAnimate } from '@formkit/auto-animate/react';

// firebase imports
import { auth } from '../firebaseConfig';
import { User, onAuthStateChanged } from 'firebase/auth';
import { addTodoData, getTodoData } from '../utilities/firebaseUtilities';

// react-bootstrap imports
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {
	createLocalData,
	deleteLocalData,
	fetchData,
} from '../utilities/helpers';
import { toast } from 'react-toastify';

// interfaces
interface TodoType {
	userId: string;
	id: string;
	title: string;
	description: string;
	createAtTimeStamp?: string;
}

const Todos: React.FC = () => {
	//  useState hooks
	const [todos, setTodos] = useState<TodoType[]>([]);
	const [currentUser, setCurrentUser] = useState<User | null>(null);

	// useRef hooks
	const titleRef = useRef<HTMLInputElement>(null);
	const contentRef = useRef<HTMLInputElement>(null);

	// autoAnimate
	const [parent] = useAutoAnimate();

	// Function to reset input
	const resetInput = (): void => {
		// Reset form inputs after submitting a todo
		if (titleRef.current && contentRef.current) {
			titleRef.current.value = '';
			contentRef.current.value = '';
		}
	};

	const submitTodo = () => {
		const newTodo = {
			userId: currentUser?.uid ?? '',
			id: crypto.randomUUID(),
			title: titleRef.current?.value || '',
			description: contentRef.current?.value || '',
		};

		if (
			titleRef.current?.value.trim() !== '' ||
			contentRef.current?.value.trim() !== ''
		) {
			setTodos((prevTodos) => [...prevTodos, newTodo]);

			createLocalData('todos', [...todos, newTodo]);

			// if user is signed in = put to database

			if (currentUser && currentUser.uid) {
				addTodoData(
					currentUser.uid,
					newTodo.id,
					newTodo.title,
					newTodo.description
				);
			}

			if (titleRef.current && contentRef.current) {
				titleRef.current.style.outline = 'none';
				contentRef.current.style.outline = 'none';
			}
		} else {
			toast.error('Please fill at least one of the fields!');

			titleRef.current.style.outline = '1px solid red';
			contentRef.current.style.outline = '1px solid red';
		}

		resetInput();
	};

	useEffect(() => {
		onAuthStateChanged(auth, (data) => {
			if (currentUser) return;
			setCurrentUser(data);
		});
	}, [currentUser]);

	useEffect(() => {
		onAuthStateChanged(auth, (data) => {
			if (data && data.uid) {
				getTodoData(data).then((databaseTodo) => {
					if (databaseTodo) {
						const typedDatabaseTodo = databaseTodo as TodoType[];

						createLocalData('todos', typedDatabaseTodo);
						setTodos(typedDatabaseTodo);
					}
				});
			} else {
				// remove item
				setTodos([]);
				deleteLocalData('todos');
			}
		});
	}, [currentUser]);

	useEffect(() => {
		const data = fetchData('todos') as TodoType[];

		if (data) {
			setTodos(data);
		}
	}, [currentUser]);

	useEffect(() => {
		console.log(todos);
	}, [todos]);

	return (
		<div className='todos-container d-flex flex-column align-items-center'>
			<div
				className='newtodo-form pt-5 d-flex flex-column'
				style={{ gap: '20px 0', width: 'clamp(300px, 90%, 500px)' }}
			>
				<Form.Group >
					<Form.Label>Title</Form.Label>
					<Form.Control
						type='title'
						placeholder='Enter title...'
						ref={titleRef}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								submitTodo();
							}
						}}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Todo</Form.Label>
					<Form.Control
						type='content'
						placeholder='Enter todo...'
						ref={contentRef}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								submitTodo();
							}
						}}
					/>
				</Form.Group>
				<div>
					<Button
						variant='dark'
						onClick={submitTodo}
					>
						Submit
					</Button>
				</div>
			</div>

			<div
				className='d-flex flex-wrap justify-content-center w-100'
				style={{
					gap: '2rem 1rem',
					padding: '5rem',
				}}
				ref={parent}
			>
				{todos &&
					todos.map((todo) => {
						return (
							<Todo
								key={todo.id}
								title={todo.title}
								description={todo.description}
								id={todo.id}
							/>
						);
					})}
			</div>
		</div>
	);
};

export default Todos;
