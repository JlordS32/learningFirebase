import React, { useRef, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import styles from '../../styles/todo.module.css';
import autoAnimate from '@formkit/auto-animate';

// BOotstrap components
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Todos = ({ todos, deleteTodo, updateTodo }) => {
	const parent = useRef(null);
	const [isEditable, setIsEditable] = useState(false);
	const [selectedTodoId, setSelectedTodoId] = useState(null);
	const [input, setInput] = useState([]);
	const [updatedTodo, setUpdatedTodo] = useState({
		id: '',
		title: '',
		content: '',
	});

	const handleIsEdit = (todoId) => {
		setIsEditable(!isEditable);
		setSelectedTodoId(todoId);
	};

	const handleUpdate = (todoId, prevTitle, prevContent) => {
		setIsEditable(!isEditable);
		setSelectedTodoId(todoId);

		if (Object.entries(input).length > 0) {
			setUpdatedTodo({
				id: todoId,
				title: input.title ? input.title : prevTitle,
				content: input.content ? input.content : prevContent,
			});
		}

		setInput([]);
	};

	const handleOnChange = (e) => {
		let newInput = {
			[e.target.name]: e.target.value,
		};

		setInput({
			...input,
			...newInput,
		});
	};

	useEffect(() => {
		parent.current && autoAnimate(parent.current);
	}, [parent]);

	useEffect(() => {
		const { id, title, content } = updatedTodo;

		if (id !== '' && title !== '' && content !== '') {
			updateTodo(id, title, content);
		}

	}, [updatedTodo]);

	return (
		<div
			className='todos w-75 py-5 d-grid justify-content-center'
			ref={parent}
			style={{
				gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
				gap: '1rem',
			}}
		>
			{todos?.map((item) => {
				return (
					<Card
						key={item.id}
						className={`${styles['todo']} shadow-sm rounded`}
					>
						{item.id === selectedTodoId && isEditable ? (
							<Card.Body className={styles['update-input']}>
								<Form >
									<Form.Control
										as='input'
										placeholder='Update title...'
										defaultValue={item.title}
										className='mb-3'
										name='title'
										onChange={handleOnChange}
									/>
									<Form.Control
										as='textarea'
										placeholder='Update content...'
										defaultValue={item.content}
										className='mb-3'
										name='content'
										style={{
											resize: 'none',
										}}
										onChange={handleOnChange}
									/>
								</Form>
								<div>
									<Button
										onClick={() =>
											handleUpdate(item.id, item.title, item.content)
										}
									>
										Update
									</Button>
								</div>
							</Card.Body>
						) : (
							<>
								<Card.Body>
									<Card.Title>{item.title}</Card.Title>
									<Card.Text>{item.content}</Card.Text>
								</Card.Body>
								<Card.Footer
									style={{
										backgroundColor: 'transparent',
										border: '0',
									}}
								>
									<div
										className='d-flex justify-content-center'
										style={{ gap: '1rem' }}
									>
										<Button onClick={() => handleIsEdit(item.id)}>
											Update
										</Button>
										<Button
											className='bg-danger border-danger'
											onClick={() => deleteTodo(item.id)}
										>
											Delete
										</Button>
									</div>
								</Card.Footer>
							</>
						)}
					</Card>
				);
			})}
		</div>
	);
};

export default Todos;
