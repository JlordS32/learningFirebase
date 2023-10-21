import { useEffect, useState, useRef } from 'react';

// components
import Todo from '../components/Todo';

// libraries
import { useAutoAnimate } from '@formkit/auto-animate/react';

// react-bootstrap imports
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { createLocalData, fetchData } from '../utilities/helpers';
import { toast } from 'react-toastify';

interface TodoType {
	id: string;
	title: string;
	content: string;
}

const Todos: React.FC = () => {
	const [todos, setTodos] = useState<TodoType[]>([]);
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
			id: crypto.randomUUID(),
			title: titleRef.current?.value || '',
			content: contentRef.current?.value || '',
		};

		if (
			titleRef.current?.value.trim() !== '' ||
			contentRef.current?.value.trim() !== ''
		) {
			setTodos(prevTodos => [...prevTodos, newTodo]);

			createLocalData('todos', [...todos, newTodo]);
		} else {
			toast.error('Please fill at least one of the fields!');

			titleRef.current.style.outline = '1px solid red';
			contentRef.current.style.outline = '1px solid red';
		}

		resetInput();
	};

	useEffect(() => {
		const data = fetchData('todos') as TodoType[];

		if (data) {
         setTodos(data);
      }
	}, []);

	return (
		<div className='todos-container d-flex flex-column align-items-center'>
			<div
				className='newtodo-form w-50 pt-5 d-flex flex-column'
				style={{ gap: '20px 0' }}
			>
				<Form.Group>
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
								content={todo.content}
								id={todo.id}
							/>
						);
					})}
			</div>
		</div>
	);
};

export default Todos;
